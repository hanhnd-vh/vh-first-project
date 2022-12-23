import { uniqBy } from 'lodash';
import { User } from '../../../database/models';
import { HttpStatus } from '../../common/constants';
import { Roles } from '../../constants';
import { ErrorWithCode } from '../../exception/error.exception';
import { compare, hash } from '../../plugins/bcrypt';
import { signToken } from '../../plugins/jwt';
import { getRolesByRoleGroupIds } from '../roles/role.service';
import { getPermissionsByRoleIds } from './../permissions/permission.service';
import { getRoleByName } from './../roles/role.service';
import { getUserById, userIncludes } from './../users/user.service';
import { ILoginBody, IRegisterBody } from './auth.interface';

export const logIn = async (body: ILoginBody) => {
    const existedUser = await getUserByUsername(body.username);
    if (!existedUser)
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'user not existed!');

    const isPasswordMatched = await compare(body.password, existedUser.password);
    if (!isPasswordMatched)
        throw new ErrorWithCode(HttpStatus.BAD_REQUEST, 'invalid username or password!');

    const token = await signUserToken(existedUser);
    return token;
};

export const register = async (body: IRegisterBody) => {
    const isUsernameExisted = await getUserByUsername(body.username);
    if (isUsernameExisted)
        throw new ErrorWithCode(HttpStatus.ITEM_EXISTED, 'username existed!');

    const hashedPassword = await hash(body.password);
    const createdUser = await User.create({
        ...body,
        password: hashedPassword,
    });

    // Set role is user by default
    const roleUser = await getRoleByName(Roles.USER);
    await createdUser.setRoles([roleUser.id]);
    const user = await getUserById(createdUser.id);
    if (!user)
        throw new ErrorWithCode(HttpStatus.INTERNAL_SERVER_ERROR, 'an error occurred!');
    const token = await signUserToken(user);
    return token;
};

const getUserByUsername = async (username: string) => {
    try {
        const existedUser = await User.findOne({
            where: {
                username,
            },
            include: userIncludes,
        });
        return existedUser;
    } catch (error) {
        console.error('error here', error);
        throw error;
    }
};

const signUserToken = async (user: User) => {
    const roleGroupIds = (user.roleGroups || []).map((roleGroup) => roleGroup.id);
    const roleInRoleGroups = await getRolesByRoleGroupIds(roleGroupIds);
    const userRoles = uniqBy([...roleInRoleGroups, ...(user.roles || [])], 'id');
    const roleIds = userRoles.map((role) => role.id);
    const roles = userRoles.map((role) => role.name);
    const permissions = ((await getPermissionsByRoleIds(roleIds)) || []).map(
        (permission) => permission.name,
    );
    const token = await signToken({
        userId: user.id,
        username: user.username,
        roles,
        permissions,
    });
    return token;
};
