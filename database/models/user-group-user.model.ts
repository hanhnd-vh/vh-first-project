import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from '../sequelize';
import { TableName } from './constant';
import { UserGroup } from './user-group.model';
import { User } from './user.model';

export class UserGroupUser extends Model<
    InferAttributes<UserGroupUser>,
    InferCreationAttributes<UserGroupUser>
> {
    declare id: CreationOptional<number>;
    declare userGroupId: number;
    declare userId: number;
}

UserGroupUser.init(
    {
        userGroupId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: UserGroup,
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: User,
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
        tableName: TableName.USER_GROUP_USER,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
        underscored: true,
    },
);
