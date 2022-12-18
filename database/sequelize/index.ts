import { Sequelize } from 'sequelize';
import {
    DATABASE_DIALECT,
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_USERNAME,
} from '../config/database.config';

class SequelizeProvider {
    static _sequelize: Sequelize;
    constructor() {}

    static initialize() {
        SequelizeProvider._sequelize = new Sequelize(
            DATABASE_NAME,
            DATABASE_USERNAME,
            DATABASE_PASSWORD,
            {
                host: DATABASE_HOST,
                dialect: DATABASE_DIALECT,
            },
        );
    }

    static getSequelize() {
        if (!SequelizeProvider._sequelize) {
            SequelizeProvider.initialize();
        }
        return SequelizeProvider._sequelize;
    }
}

export default SequelizeProvider.getSequelize();
