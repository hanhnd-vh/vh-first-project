import { uniq } from 'lodash';
import { Role, RoleGroup } from '../../../database/models';
import { HttpStatus } from '../../common/constants';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_VALUE,
} from '../../constants';
import { ErrorWithCode } from '../../exception/error.exception';
import { checkExistedRoleIds } from '../users/user.service';
import {
    IChangeRoleGroupRolesBody,
    ICreateRoleGroupBody,
    IGetRoleGroupListQuery,
    IUpdateRoleGroupBody,
} from './role-group.interface';

const roleGroupIncludes = [
    {
        model: Role,
        as: 'roles',
        through: { attributes: [] },
    },
];

export const createRoleGroup = async (body: ICreateRoleGroupBody) => {
    const isRoleGroupExisted = await checkExistedRoleGroupName(body.name);
    if (isRoleGroupExisted)
        throw new ErrorWithCode(HttpStatus.ITEM_EXISTED, 'roleGroup existed!');
    const createdRoleGroup = await RoleGroup.create(body);
    const roleGroup = await getRoleGroupById(createdRoleGroup.id);
    return roleGroup;
};

export const getRoleGroupById = async (roleGroupId: number) => {
    Role;
    const roleGroup = await RoleGroup.findByPk(roleGroupId, {
        include: roleGroupIncludes,
    });
    if (!roleGroup)
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'role group not found!');
    return roleGroup;
};

export const getRoleGroupList = async (query: IGetRoleGroupListQuery) => {
    const {
        page = DEFAULT_PAGE_VALUE,
        limit = DEFAULT_PAGE_LIMIT,
        orderBy = DEFAULT_ORDER_BY,
        orderDirection = DEFAULT_ORDER_DIRECTION,
    } = query;
    const offset = (+page - 1) * +limit;

    const { rows, count } = await RoleGroup.findAndCountAll({
        offset,
        limit: +limit,
        order: [[`${orderBy}`, `${orderDirection}`]],
    });
    return { items: rows, totalItems: count };
};

export const updateRoleGroup = async (
    roleGroupId: number,
    body: IUpdateRoleGroupBody,
) => {
    const roleGroup = await getRoleGroupById(roleGroupId);
    const updatedRoleGroup = await roleGroup.update(body);
    return updatedRoleGroup;
};

export const changeRoleGroupRoles = async (
    roleGroupId: number,
    body: IChangeRoleGroupRolesBody,
) => {
    const roleGroup = await getRoleGroupById(roleGroupId);
    const uniqRoleIds = uniq(body.roleIds);
    const isRoleIdsExisted = await checkExistedRoleIds(uniqRoleIds);
    if (!isRoleIdsExisted)
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'some role not existed');
    await roleGroup.setRoles(uniqRoleIds);
    const updatedRoleGroup = await getRoleGroupById(roleGroupId);
    return updatedRoleGroup;
};

export const deleteRoleGroup = async (roleGroupId: number) => {
    const roleGroup = await getRoleGroupById(roleGroupId);
    await roleGroup.destroy();
    return 'OK';
};

export const checkExistedRoleGroupName = async (name: string) => {
    const roleGroup = await RoleGroup.findOne({
        where: {
            name,
        },
    });
    if (roleGroup) return true;
    return false;
};
