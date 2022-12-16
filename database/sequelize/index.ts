import { Sequelize } from 'sequelize';
import {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_USERNAME,
} from '../config/database.config';

const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        dialect: 'mysql',
    }
);

export const getSequelize = () => {
    if (sequelize) return sequelize;
    return new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
        host: DATABASE_HOST,
        dialect: 'mysql',
    });
};
