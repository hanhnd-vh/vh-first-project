import { uniq } from 'lodash';
import { User, UserGroup } from '../../../database/models';
import { DEFAULT_PAGE_VALUE } from '../../constants';
import { ErrorWithCode } from '../../exception/error.exception';
import { HttpStatus } from './../../common/constants';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
} from './../../constants';
import { getUserById, userExcludeAttributes } from './../users/user.service';
import {
    IChangeUserGroupUsersBody,
    ICreateUserGroupBody,
    IGetUserGroupListQuery,
    IUpdateUserGroupBody,
} from './user-group.interface';

export const userGroupIncludes = [
    {
        model: User,
        as: 'manager',
        attributes: {
            exclude: userExcludeAttributes,
        },
    },
    {
        model: User,
        as: 'users',
        attributes: {
            exclude: userExcludeAttributes,
        },
        through: {
            attributes: [],
        },
    },
];

export const userGroupExcludeAttributes = ['manager_id'];

export const createUserGroup = async (body: ICreateUserGroupBody) => {
    if (body.managerId) {
        await getUserById(body.managerId);
    }
    const createdUserGroup = await UserGroup.create(body);
    const userGroup = await getUserGroupById(createdUserGroup.id);
    return userGroup;
};

export const getUserGroupList = async (query: IGetUserGroupListQuery) => {
    const {
        page = DEFAULT_PAGE_VALUE,
        limit = DEFAULT_PAGE_LIMIT,
        orderBy = DEFAULT_ORDER_BY,
        orderDirection = DEFAULT_ORDER_DIRECTION,
    } = query;

    const offset = (+page - 1) * +limit;
    const { rows, count } = await UserGroup.findAndCountAll({
        offset,
        limit: +limit,
        order: [[`${orderBy}`, `${orderDirection}`]],
        attributes: {
            exclude: userGroupExcludeAttributes,
        },
    });
    return { items: rows, totalItems: count };
};

export const updateUserGroup = async (
    userGroupId: number,
    body: IUpdateUserGroupBody,
) => {
    const userGroup = await getUserGroupById(userGroupId);
    const updatedUserGroup = await userGroup.update(body);
    return updatedUserGroup;
};

export const changeUserGroupUsers = async (
    userGroupId: number,
    body: IChangeUserGroupUsersBody,
) => {
    const userGroup = await getUserGroupById(userGroupId);
    const uniqUserIds = uniq(body.userIds);
    const isUserIdsExisted = await checkExistedUserIds(uniqUserIds);
    if (!isUserIdsExisted) {
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'some users not existed');
    }
    await userGroup.setUsers(uniqUserIds);
    const updatedUserGroup = await getUserGroupById(userGroupId);
    return updatedUserGroup;
};

export const deleteUserGroup = async (userGroupId: number) => {
    const userGroup = await getUserGroupById(userGroupId);
    await userGroup.destroy();
    return 'OK';
};

export const getUserGroupById = async (id: number) => {
    const userGroup = await UserGroup.findByPk(id, {
        include: userGroupIncludes,
        attributes: {
            exclude: userGroupExcludeAttributes,
        },
    });
    if (!userGroup) {
        throw new ErrorWithCode(HttpStatus.NOT_FOUND, 'user group not found!');
    }
    return userGroup;
};

export const checkExistedUserIds = async (userIds: number[]) => {
    const existedUserList = await User.findAll({
        where: {
            id: userIds,
        },
    });
    return existedUserList.length === userIds.length;
};
