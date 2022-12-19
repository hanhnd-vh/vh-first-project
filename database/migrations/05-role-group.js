const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface) {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.createTable(
                'role_groups',
                {
                    id: {
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                        type: DataTypes.INTEGER,
                    },
                    name: {
                        allowNull: false,
                        type: DataTypes.STRING(200),
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

    async down(queryInterface) {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.dropTable('role_groups', {
                transaction,
            });
        });
    },
};
