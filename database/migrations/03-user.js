const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.createTable(
                'users',
                {
                    id: {
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                        type: DataTypes.INTEGER,
                    },
                    username: {
                        allowNull: false,
                        unique: true,
                        type: DataTypes.STRING(100),
                    },
                    password: {
                        allowNull: false,
                        type: DataTypes.STRING(400),
                    },
                    email: {
                        allowNull: false,
                        type: DataTypes.STRING(100),
                    },
                    created_at: {
                        type: DataTypes.DATE,
                    },
                    updated_at: {
                        type: DataTypes.DATE,
                    },
                    deleted_at: {
                        type: DataTypes.DATE,
                    },
                },
                {
                    charset: 'utf8mb4',
                    collate: 'utf8mb4_unicode_ci',
                    transaction,
                },
            );
        });
    },

    down: (queryInterface) => {
        return queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.dropTable('users', {
                transaction,
            });
        });
    },
};
