import { Role, RoleGroup, User } from '../../../database/models';
import { HttpStatus } from '../../common/constants';
import { ErrorWithCode } from '../../exception/error.exception';
import { hash } from '../../plugins/bcrypt';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_VALUE,
} from './../../constants';
import {
    IChangeUserPasswordBody,
    IChangeUserRoleGroupsBody,
    IChangeUserRolesBody,
    IGetUserListQuery,
    IUpdateUserBody,
} from './user.interface';

export const userExcludeAttributes = ['password'];
export const userIncludes = [
    {
        model: Role,
        as: 'roles',
        through: { attributes: [] },
    },
    {
        model: RoleGroup,
        as: 'roleGroups',
        through: { attributes: [] },
    },
];

export const getUserById = async (userId: number) => {
    const user = await User.findByPk(userId, {
        attributes: {
            exclude: userExcludeAttributes,
        },
        include: userIncludes,
    });
    if (!user) throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'user not found!');
    return user;
};

export const getUserByUsername = async (username: string) => {
    const existedUser = await User.findOne({
        where: {
            username,
        },
    });
    if (!existedUser)
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'user not found!');
    return existedUser;
};

export const getUserList = async (query: IGetUserListQuery) => {
    const {
        page = DEFAULT_PAGE_VALUE,
        limit = DEFAULT_PAGE_LIMIT,
        orderBy = DEFAULT_ORDER_BY,
        orderDirection = DEFAULT_ORDER_DIRECTION,
        roleIds,
    } = query;
    const offset = (+page - 1) * +limit;

    const { rows, count } = await User.findAndCountAll({
        offset,
        limit: +limit,
        order: [[`${orderBy}`, `${orderDirection}`]],
        attributes: {
            exclude: userExcludeAttributes,
        },
        include: {
            model: Role,
            as: 'roles',
            attributes: ['id', 'name'],
            where: {
                id: roleIds,
            },
            through: {
                attributes: [],
            },
        },
        distinct: true,
    });
    return { items: rows, totalItems: count };
};

export const updateUserProfile = async (userId: number, body: IUpdateUserBody) => {
    const user = await getUserById(userId);
    const updatedUser = await user.update(body);
    return updatedUser;
};

export const updateUserPassword = async (
    userId: number,
    body: IChangeUserPasswordBody,
) => {
    const user = await getUserById(userId);
    const hashedPassword = await hash(body.password);
    const updatedUser = await user.update({
        password: hashedPassword,
    });
    return updatedUser;
};

export const updateUserRoles = async (userId: number, body: IChangeUserRolesBody) => {
    const user = await getUserById(userId);
    await user.setRoles(body.roleIds);
    const updatedUser = await getUserById(userId);
    return updatedUser;
};

export const updateUserRoleGroups = async (
    userId: number,
    body: IChangeUserRoleGroupsBody,
) => {
    const user = await getUserById(userId);
    await user.setRoleGroups(body.roleGroupIds);
    const updatedUser = await getUserById(userId);
    return updatedUser;
};

export const deleteUser = async (userId: number) => {
    const user = await getUserById(userId);
    await user.destroy();
    return 'OK';
};
