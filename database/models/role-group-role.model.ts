import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from '../sequelize';
import { TableName } from './constant';
import { RoleGroup } from './role-group.model';
import { Role } from './role.model';

export class RoleGroupRole extends Model<
    InferAttributes<RoleGroupRole>,
    InferCreationAttributes<RoleGroupRole>
> {
    declare id: CreationOptional<number>;
    declare roleGroupId: number;
    declare roleId: number;
}

RoleGroupRole.init(
    {
        roleGroupId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'role_group_id',
            references: {
                model: RoleGroup,
                key: 'id',
            },
        },
        roleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'role_id',
            references: {
                model: Role,
                key: 'id',
            },
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        tableName: TableName.ROLE_GROUP_ROLE,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
    },
);
