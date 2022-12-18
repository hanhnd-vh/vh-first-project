import { uniq } from 'lodash';
import { Role } from '../../../database/models/role.model';
import { User } from '../../../database/models/user.model';
import { HttpStatus } from '../../common/constants';
import { ErrorWithCode } from '../../exception/error.exception';
import { compare, hash } from '../../plugins/bcrypt';
import { signToken } from '../../plugins/jwt';
import { getPermissionsByRoleIds } from './../permissions/permission.service';
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

    const isRolesExisted = await checkExistedRoleIds(body.roleIds);
    if (!isRolesExisted)
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'some roles are not existed!');

    const hashedPassword = await hash(body.password);
    const createdUser = await User.create({
        ...body,
        password: hashedPassword,
    });
    await createdUser.setRoles(body.roleIds);
    const user = await getUserById(createdUser.id);
    if (!user)
        throw new ErrorWithCode(HttpStatus.INTERNAL_SERVER_ERROR, 'an error occurred!');
    const token = await signUserToken(user);
    return token;
};

const checkExistedRoleIds = async (roleIds: number[]) => {
    const uniqRoleIds = uniq(roleIds);
    const existedRoleList = await Role.findAll({
        where: {
            id: uniqRoleIds,
        },
    });
    return existedRoleList.length === uniqRoleIds.length;
};

const getUserByUsername = async (username: string) => {
    const existedUser = await User.findOne({
        where: {
            username,
        },
        include: userIncludes,
    });
    return existedUser;
};

const signUserToken = async (user: User) => {
    const roleIds = (user.roles || []).map((role) => role.id);
    const roles = (user.roles || []).map((role) => role.name);
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
