import { Role } from '../../../database/models/role.model';
import { ICreateRoleBody, IUpdatePermissionsBody } from './role.interface';

export const createRole = async (body: ICreateRoleBody) => {
    const createdRole = await Role.create(body);
    const role = await getRoleById(createdRole.id);
    return role;
};

export const updatePermissions = async (
    roleId: number,
    body: IUpdatePermissionsBody
) => {
    const role = await getRoleById(roleId);
};

export const getRoleById = async (roleId: number) => {
    const role = await Role.findByPk(roleId);
    if (!role) throw new Error('role not found!');
    return role;
};

export const checkExistedRoleId = async (roleId: number) => {
    const existedRole = await Role.findByPk(roleId);
    if (existedRole) return true;
    return false;
};
