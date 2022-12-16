import { ICommonGetListQuery } from './../../interfaces';
export interface IPermission {
    id: number;
    name: string;
}

export interface IGetPermissionListQuery extends ICommonGetListQuery {}

export interface ICreatePermissionBody {
    name: string;
}

export interface IUpdatePermissionBody {
    name: string;
}
