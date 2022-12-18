import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { TableName } from './constant';
import { Permission } from './permission.model';
import { Role } from './role.model';

export class RolePermission extends Model<
    InferAttributes<RolePermission>,
    InferCreationAttributes<RolePermission>
> {
    declare roleId: number;
    declare permissionId: number;
}

RolePermission.init(
    {
        roleId: {
            type: DataTypes.INTEGER,
            field: 'role_id',
            references: {
                model: Role,
                key: 'id',
            },
        },
        permissionId: {
            type: DataTypes.INTEGER,
            field: 'permission_id',
            references: {
                model: Permission,
                key: 'id',
            },
        },
    },
    {
        sequelize: sequelize,
        tableName: TableName.ROLE_PERMISSION,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);
