const { seedingRolePermissions } = require('../constants/seeding-constants');

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkInsert(
                'role_permissions',
                seedingRolePermissions,
                {
                    transaction,
                },
            );
        });
    },

    down: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkDelete(
                'role_permissions',
                {
                    id: seedingRolePermissions.map((rolePermission) => rolePermission.id),
                },
                {
                    transaction,
                },
            );
        });
    },
};
