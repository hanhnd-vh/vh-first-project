import { TableName } from './constant';
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
} from 'sequelize';
import sequelize from '../sequelize';
export class RoleGroup extends Model<
    InferAttributes<RoleGroup>,
    InferCreationAttributes<RoleGroup>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare setRoles: (roleIds: number[]) => Promise<void>;
}

RoleGroup.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        tableName: TableName.ROLE_GROUP,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
    },
);
