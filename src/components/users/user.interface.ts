import { ICommonGetListQuery } from '../../interfaces';
import { IRole } from '../roles/role.interface';

export interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
    role: IRole[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

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
