import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { TableName } from './constant';
import { UserGroup } from './user-group.model';
import { User } from './user.model';

export class UserGroupUser extends Model<
    InferAttributes<UserGroupUser>,
    InferCreationAttributes<UserGroupUser>
> {
    declare userGroupId: number;
    declare userId: number;
}

UserGroupUser.init(
    {
        userGroupId: {
            type: DataTypes.INTEGER,
            references: {
                model: UserGroup,
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
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
