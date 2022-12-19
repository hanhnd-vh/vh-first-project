import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { TableName } from './constant';
import { RoleGroup } from './role-group.model';
import { User } from './user.model';
export class UserRoleGroup extends Model<
    InferAttributes<UserRoleGroup>,
    InferCreationAttributes<UserRoleGroup>
> {
    declare userId: number;
    declare roleGroupId: number;
}

UserRoleGroup.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id',
            references: {
                model: User,
                key: 'id',
            },
        },
        roleGroupId: {
            type: DataTypes.INTEGER,
            field: 'role_group_id',
            references: {
                model: RoleGroup,
                key: 'id',
            },
        },
    },
    {
        sequelize: sequelize,
        tableName: TableName.USER_ROLE_GROUP,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
    },
);
