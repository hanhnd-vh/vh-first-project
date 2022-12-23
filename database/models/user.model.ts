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
import { UserGroup } from './user-group.model';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare password: string;
    declare email: string;
    declare setRoles: (roleIds: number[]) => Promise<void>;
    declare roles?: Role[];
    declare setRoleGroups: (roleGroupIds: number[]) => Promise<void>;
    declare roleGroups?: RoleGroup[];
    declare userGroups?: UserGroup[];
    declare manageGroups?: UserGroup[];
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        tableName: TableName.USER,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
    },
);
