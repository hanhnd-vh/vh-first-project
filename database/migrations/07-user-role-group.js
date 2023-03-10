const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.createTable(
                'user_role_groups',
                {
                    user_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: 'users',
                            key: 'id',
                        },
                    },
                    role_group_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: 'role_groups',
                            key: 'id',
                        },
                    },
                    id: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true,
                        allowNull: false,
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
            return await queryInterface.dropTable('user_role_groups', {
                transaction,
            });
        });
    },
};
