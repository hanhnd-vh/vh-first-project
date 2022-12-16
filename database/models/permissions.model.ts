import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { getSequelize } from '../sequelize';
import { TableName } from './constant';

export class Permission extends Model<
    InferAttributes<Permission>,
    InferCreationAttributes<Permission>
> {
    declare id: CreationOptional<number>;
    declare actionId: number;
    declare resourceId: number;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        actionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'action_id',
        },
        resourceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'resource_id',
        },
    },
    {
        sequelize: getSequelize(),
        tableName: TableName.PERMISSION,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);
