import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from '../sequelize';
import { TableName } from './constant';
import { Role } from './role.model';
import { User } from './user.model';
export class UserRole extends Model<
    InferAttributes<UserRole>,
    InferCreationAttributes<UserRole>
> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare roleId: number;
}

UserRole.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'user_id',
            references: {
                model: User,
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
        tableName: TableName.USER_ROLE,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
    },
);
