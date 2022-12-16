import { ICommonGetListQuery } from '../../interfaces';
import { IPermission } from './../permissions/permission.interface';
export interface IRole {
    id: number;
    name: string;
    permissions: IPermission[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IGetRoleListQuery extends ICommonGetListQuery {}

export interface ICreateRoleBody {
    name: string;
}

export interface IUpdateRoleBody {
    name: string;
}

export interface IChangeRolePermissionsBody {
    permissionIds: number[];
}
