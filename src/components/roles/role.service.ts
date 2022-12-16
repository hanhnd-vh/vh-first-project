import { Permission } from '../../../database/models/permissions.model';
import { Role } from '../../../database/models/role.model';
import { HttpStatus } from '../../common/constants';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_VALUE,
} from '../../constants';
import { ErrorWithCode } from '../../exception/error.exception';
import {
    ICreateRoleBody,
    IGetRoleListQuery,
    IChangeRolePermissionsBody,
    IUpdateRoleBody,
} from './role.interface';

const roleIncludes = [
    {
        model: Permission,
        as: 'permissions',
    },
];

export const createRole = async (body: ICreateRoleBody) => {
    const isRoleExisted = await checkExistedRoleName(body.name);
    if (isRoleExisted)
        throw new ErrorWithCode(HttpStatus.ITEM_EXISTED, 'role existed!');
    const createdRole = await Role.create(body);
    const role = await getRoleById(createdRole.id);
    return role;
};

export const getRoleById = async (roleId: number) => {
    const role = await Role.findByPk(roleId, {
        include: roleIncludes,
    });
    if (!role)
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'role not found!');
    return role;
};

export const getRoleList = async (query: IGetRoleListQuery) => {
    const {
        page = DEFAULT_PAGE_VALUE,
        limit = DEFAULT_PAGE_LIMIT,
        orderBy = DEFAULT_ORDER_BY,
        orderDirection = DEFAULT_ORDER_DIRECTION,
    } = query;
    const offset = (+page - 1) * +limit;

    const { rows, count } = await Role.findAndCountAll({
        offset,
        limit,
        order: [[`${orderBy}`, `${orderDirection}`]],
        include: roleIncludes,
    });
    return { items: rows, totalItems: count };
};

export const updateRole = async (roleId: number, body: IUpdateRoleBody) => {
    const role = await getRoleById(roleId);
    const updatedRole = await role.update(body);
    return updatedRole;
};

export const updatePermissions = async (
    roleId: number,
    body: IChangeRolePermissionsBody
) => {
    const role = await getRoleById(roleId);
};

export const deleteRole = async (roleId: number) => {
    const role = await getRoleById(roleId);
    await role.destroy();
    return 'OK';
};

export const checkExistedRoleName = async (name: string) => {
    const role = await Role.findOne({
        where: {
            name,
        },
    });
    if (role) return true;
    return false;
};
