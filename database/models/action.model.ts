import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { getSequelize } from '../sequelize';
import { TableName } from './constant';

export class Action extends Model<
    InferAttributes<Action>,
    InferCreationAttributes<Action>
> {
    declare id: CreationOptional<number>;
    declare name: string;
}

Action.init(
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
        sequelize: getSequelize(),
        tableName: TableName.ACTION,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);
