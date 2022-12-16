import { Role } from '../../../database/models/role.model';
import { User } from '../../../database/models/user.model';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_VALUE,
} from './../../constants';
import { checkExistedRoleId } from './../roles/role.service';
import {
    IChangeUserPasswordBody,
    IChangeUserRoleBody,
    ICreateUserBody,
    IGetUserListQuery,
    IUpdateUserBody,
} from './user.interface';

const userExcludeAttributes = ['password', 'roleId'];
const userIncludes = [
    {
        model: Role,
        as: 'role',
    },
];

export const createUser = async (body: ICreateUserBody) => {
    const isUsernameExisted = await checkExistedUsername(body.username);
    if (isUsernameExisted) throw new Error('username existed!');

    const isRoleExisted = await checkExistedRoleId(body.roleId);
    if (!isRoleExisted) throw new Error('role not existed!');

    const createdUser = await User.create(body);
    const user = await getUserById(createdUser.id);
    return user;
};

export const getUserById = async (userId: number) => {
    const user = await User.findByPk(userId, {
        attributes: {
            exclude: userExcludeAttributes,
        },
        include: userIncludes,
    });
    if (!user) throw new Error('user not found!');
    return user;
};

export const getUserList = async (query: IGetUserListQuery) => {
    const {
        page = DEFAULT_PAGE_VALUE,
        limit = DEFAULT_PAGE_LIMIT,
        orderBy = DEFAULT_ORDER_BY,
        orderDirection = DEFAULT_ORDER_DIRECTION,
    } = query;
    const offset = (+page - 1) * +limit;

    const { rows, count } = await User.findAndCountAll({
        offset,
        limit,
        order: [`${orderBy}`, `${orderDirection}`],
        attributes: {
            exclude: userExcludeAttributes,
        },
        include: userIncludes,
    });
    return { items: rows, totalItems: count };
};

export const updateUserProfile = async (
    userId: number,
    body: IUpdateUserBody
) => {
    const user = await getUserById(userId);
    await user.update(body);
    const updatedUser = await getUserById(user.id);
    return updatedUser;
};

export const updateUserPassword = async (
    userId: number,
    body: IChangeUserPasswordBody
) => {
    const user = await getUserById(userId);
    await user.update(body);
    const updatedUser = await getUserById(user.id);
    return updatedUser;
};

export const updateUserRole = async (
    userId: number,
    body: IChangeUserRoleBody
) => {
    const user = await getUserById(userId);
    await user.update(body);
    const updatedUser = await getUserById(user.id);
    return updatedUser;
};

export const deleteUser = async (userId: number) => {
    const user = await getUserById(userId);
    await user.destroy();
    return 'OK';
};

export const checkExistedUsername = async (username: string) => {
    const existedUser = await User.findOne({
        where: {
            username,
        },
    });
    if (existedUser) return true;
    return false;
};
