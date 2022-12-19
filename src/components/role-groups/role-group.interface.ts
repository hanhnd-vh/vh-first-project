import { ICommonGetListQuery } from '../../interfaces';

export interface IGetRoleGroupListQuery extends ICommonGetListQuery {}

export interface ICreateRoleGroupBody {
    name: string;
}

export interface IUpdateRoleGroupBody {
    name: string;
}

export interface IChangeRoleGroupRolesBody {
    roleIds: number[];
}
