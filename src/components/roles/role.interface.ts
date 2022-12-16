export interface IRole {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface ICreateRoleBody {
    name: string;
}

export interface IUpdatePermissionsBody {
    permissionIds: number[];
}
