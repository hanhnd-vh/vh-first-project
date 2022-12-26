import { UserRole } from './../../../database/models/user-roles.model';
import { difference, isEmpty, uniq } from 'lodash';
import { Role, RoleGroup, User } from '../../../database/models';
import sequelize from '../../../database/sequelize';
import { HttpStatus } from '../../common/constants';
import { ErrorWithCode } from '../../exception/error.exception';
import { hash } from '../../plugins/bcrypt';
import { UserGroup } from './../../../database/models/user-group.model';
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
    {
        model: UserGroup,
        as: 'userGroups',
        through: { attributes: [] },
    },
    {
        model: UserGroup,
        as: 'manageGroups',
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

    const whereConditions = {
        ...(roleIds && {
            id: roleIds,
        }),
    };

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
            ...(!isEmpty(whereConditions) && { where: whereConditions }),
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
    const user = await getUserById(userId); // 1 select query
    const uniqRoleIds = uniq(body.roleIds);
    const isRoleExisted = await checkExistedRoleIds(uniqRoleIds);
    if (!isRoleExisted) {
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'some roles not existed');
    }
    // await user.setRoles(uniqRoleIds);
    await setUserRoles(user.id, uniqRoleIds);
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

export const checkExistedRoleIds = async (roleIds: number[]) => {
    const existedRoleList = await Role.findAll({
        where: {
            id: roleIds,
        },
    });
    return existedRoleList.length === roleIds.length;
};

export const getUserMentees = async (userId: number) => {
    const user = await getUserById(userId);
    if (!user.manageGroups || !user.manageGroups.length)
        return {
            items: [],
            totalItems: 0,
        };

    const manageGroupsIds = user.manageGroups.map((group) => group.id);
    const mentees = await getUsersByUserGroupIds(manageGroupsIds);
    return mentees;
};

export const getUsersByUserGroupIds = async (userGroupIds: number[]) => {
    const { rows, count } = await User.findAndCountAll({
        include: {
            model: UserGroup,
            attributes: [],
            as: 'userGroups',
            where: {
                id: userGroupIds,
            },
            through: {
                attributes: [],
            },
        },
        attributes: {
            exclude: userExcludeAttributes,
        },
        distinct: true,
    });
    return {
        items: rows,
        totalItems: count,
    };
};

export const setUserRoles = async (userId: number, roleIds: number[]) => {
    await sequelize.transaction(async (transaction) => {
        const userRoleIds = (
            await UserRole.findAll({
                where: {
                    userId,
                },
                transaction,
            })
        ).map((userRole) => userRole.roleId);

        const toDeleteRoleIds = difference(userRoleIds, roleIds);
        const toInsertRoleIds = difference(roleIds, userRoleIds);

        await UserRole.destroy({
            where: {
                userId,
                roleId: toDeleteRoleIds,
            },
            transaction,
        });

        await UserRole.bulkCreate(
            toInsertRoleIds.map((roleId) => {
                return {
                    userId,
                    roleId,
                };
            }),
            { transaction },
        );
    });
};
