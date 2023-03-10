const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.createTable(
                'user_roles',
                {
                    user_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: 'users',
                            key: 'id',
                        },
                    },
                    role_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: 'roles',
                            key: 'id',
                        },
                    },
                    id: {
                        primaryKey: true,
                        allowNull: false,
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
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
            return await queryInterface.dropTable('user_roles', {
                transaction,
            });
        });
    },
};
