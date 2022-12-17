import jwt from 'jsonwebtoken';
import { uniq } from 'lodash';
import { Role } from '../../../database/models/role.model';
import { User } from '../../../database/models/user.model';
import { HttpStatus } from '../../common/constants';
import { compare, hash } from '../../common/helper/bcrypt';
import { ErrorWithCode } from '../../exception/error.exception';
import { getUserById, userIncludes } from './../users/user.service';
import { IJwtPayload, ILoginBody, IRegisterBody } from './auth.interface';

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || 'secret';
const ACCESS_TOKEN_SECRET_EXPIRES_IN =
    process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN || '10m';

export const signToken = async (
    payload: IJwtPayload,
    secretKey = ACCESS_TOKEN_SECRET_KEY,
    expiresIn = ACCESS_TOKEN_SECRET_EXPIRES_IN
) => {
    return jwt.sign(payload, secretKey, {
        expiresIn,
    });
};

export const verifyToken = async (
    token: string,
    secretKey = ACCESS_TOKEN_SECRET_KEY
) => {
    return jwt.verify(token, secretKey);
};

export const logIn = async (body: ILoginBody) => {
    const existedUser = await getUserByUsername(body.username);
    if (!existedUser)
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'user not existed!');

    const isPasswordMatched = await compare(
        body.password,
        existedUser.password
    );
    if (!isPasswordMatched)
        throw new ErrorWithCode(
            HttpStatus.BAD_REQUEST,
            'invalid username or password!'
        );

    const roleIds = (existedUser.roles || []).map((role) => role.id);
    const token = await signToken({
        userId: existedUser.id,
        username: existedUser.username,
        roleIds,
    });

    return token;
};

export const register = async (body: IRegisterBody) => {
    const isUsernameExisted = await getUserByUsername(body.username);
    if (isUsernameExisted)
        throw new ErrorWithCode(HttpStatus.ITEM_EXISTED, 'username existed!');

    const isRolesExisted = await checkExistedRoleIds(body.roleIds);
    if (!isRolesExisted)
        throw new ErrorWithCode(
            HttpStatus.ITEM_NOT_FOUND,
            'some roles are not existed!'
        );

    const hashedPassword = await hash(body.password);
    const createdUser = await User.create({
        ...body,
        password: hashedPassword,
    });
    await createdUser.setRoles(body.roleIds);
    const user = await getUserById(createdUser.id);
    if (!user)
        throw new ErrorWithCode(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'an error occurred!'
        );

    const roleIds = (user.roles || []).map((role) => role.id);
    const token = await signToken({
        userId: user.id,
        username: user.username,
        roleIds,
    });
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

export const getUserByUsername = async (username: string) => {
    const existedUser = await User.findOne({
        where: {
            username,
        },
        include: userIncludes,
    });
    return existedUser;
};
