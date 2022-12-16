import { uniq } from 'lodash';
import { Role } from '../../../database/models/role.model';
import { User } from '../../../database/models/user.model';
import { HttpStatus } from '../../common/constants';
import { ErrorWithCode } from '../../exception/error.exception';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_VALUE,
} from './../../constants';
import {
    IChangeUserPasswordBody,
    IChangeUserRolesBody,
    ICreateUserBody,
    IGetUserListQuery,
    IUpdateUserBody,
} from './user.interface';

const userExcludeAttributes = ['password', 'roleId'];
const userIncludes = [
    {
        model: Role,
        as: 'roles',
        through: { attributes: [] },
    },
];

export const createUser = async (body: ICreateUserBody) => {
    const isUsernameExisted = await checkExistedUsername(body.username);
    if (isUsernameExisted)
        throw new ErrorWithCode(HttpStatus.ITEM_EXISTED, 'username existed!');

    const isRolesExisted = await checkExistedRoleIds(body.roleIds);
    if (!isRolesExisted)
        throw new ErrorWithCode(
            HttpStatus.ITEM_NOT_FOUND,
            'some roles are not existed!'
        );

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
    if (!user)
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'user not found!');
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
        order: [[`${orderBy}`, `${orderDirection}`]],
        attributes: {
            exclude: userExcludeAttributes,
        },
    });
    return { items: rows, totalItems: count };
};

export const updateUserProfile = async (
    userId: number,
    body: IUpdateUserBody
) => {
    const user = await getUserById(userId);
    const updatedUser = await user.update(body);
    return updatedUser;
};

export const updateUserPassword = async (
    userId: number,
    body: IChangeUserPasswordBody
) => {
    const user = await getUserById(userId);
    const updatedUser = await user.update(body);
    return updatedUser;
};

export const updateUserRoles = async (
    userId: number,
    body: IChangeUserRolesBody
) => {
    const user = await getUserById(userId);
    await user.setRoles(body.roleIds);
    const updatedUser = await getUserById(userId);
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

export const checkExistedRoleIds = async (roleIds: number[]) => {
    const uniqRoleIds = uniq(roleIds);
    const existedRoleList = await Role.findAll({
        where: {
            id: uniqRoleIds,
        },
    });
    return existedRoleList.length === uniqRoleIds.length;
};
