import { ICommonGetListQuery } from '../../interfaces';

export interface IGetUserListQuery extends ICommonGetListQuery {}

export interface ICreateUserBody {
    username: string;
    password: string;
    email: string;
    roleIds: number[];
}

export interface IUpdateUserBody {
    email: string;
}

export interface IChangeUserPasswordBody {
    password: string;
}

export interface IChangeUserRolesBody {
    roleIds: number[];
}
