import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from '../sequelize';
import { TableName } from './constant';
import { User } from './user.model';

export class UserGroup extends Model<
    InferAttributes<UserGroup>,
    InferCreationAttributes<UserGroup>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare managerId: CreationOptional<number>;
}

UserGroup.init(
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
        managerId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
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
