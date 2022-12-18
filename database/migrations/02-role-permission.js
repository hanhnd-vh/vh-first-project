const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.createTable(
                'role_permissions',
                {
                    role_id: {
                        allowNull: false,
                        primaryKey: true,
                        type: DataTypes.INTEGER,
                        references: {
                            model: 'roles',
                            key: 'id',
                        },
                    },
                    permission_id: {
                        allowNull: false,
                        primaryKey: true,
                        type: DataTypes.INTEGER,
                        references: {
                            model: 'permissions',
                            key: 'id',
                        },
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
            return await queryInterface.dropTable('role_permissions', {
                transaction,
            });
        });
    },
};
