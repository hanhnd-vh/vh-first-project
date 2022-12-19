import { Permission, Role } from '../../../database/models';
import { HttpStatus } from '../../common/constants';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_VALUE,
} from '../../constants';
import { ErrorWithCode } from '../../exception/error.exception';
import {
    ICreatePermissionBody,
    IGetPermissionListQuery,
    IUpdatePermissionBody,
} from './permission.interface';

export const createPermission = async (body: ICreatePermissionBody) => {
    const isPermissionExisted = await checkExistedPermissionName(body.name);
    if (isPermissionExisted)
        throw new ErrorWithCode(HttpStatus.ITEM_EXISTED, 'permission existed!');
    const createdPermission = await Permission.create(body);
    const permission = await getPermissionById(createdPermission.id);
    return permission;
};

export const getPermissionById = async (permissionId: number) => {
    const permission = await Permission.findByPk(permissionId, {});
    if (!permission)
        throw new ErrorWithCode(HttpStatus.ITEM_NOT_FOUND, 'permission not found!');
    return permission;
};

export const getPermissionList = async (query: IGetPermissionListQuery) => {
    const {
        page = DEFAULT_PAGE_VALUE,
        limit = DEFAULT_PAGE_LIMIT,
        orderBy = DEFAULT_ORDER_BY,
        orderDirection = DEFAULT_ORDER_DIRECTION,
    } = query;
    const offset = (+page - 1) * +limit;

    const { rows, count } = await Permission.findAndCountAll({
        offset,
        limit: +limit,
        order: [[`${orderBy}`, `${orderDirection}`]],
    });
    return { items: rows, totalItems: count };
};

export const updatePermission = async (
    permissionId: number,
    body: IUpdatePermissionBody,
) => {
    const permission = await getPermissionById(permissionId);
    const updatedPermission = await permission.update(body);
    return updatedPermission;
};

export const deletePermission = async (permissionId: number) => {
    const permission = await getPermissionById(permissionId);
    await permission.destroy();
    return 'OK';
};

export const checkExistedPermissionName = async (name: string) => {
    const permission = await Permission.findOne({
        where: {
            name,
        },
    });
    if (permission) return true;
    return false;
};

export const getPermissionsByRoleIds = async (roleIds: number[]) => {
    const permissions = await Permission.findAll({
        include: [
            {
                model: Role,
                attributes: ['id'],
                as: 'roles',
                where: {
                    id: roleIds,
                },
            },
        ],
    });
    return permissions;
};
