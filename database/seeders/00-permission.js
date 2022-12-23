const { Permissions, seedingPermissions } = require('../constants/seeding-constants');

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkInsert('permissions', seedingPermissions, {
                transaction,
            });
        });
    },

    down: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.sequelize.query(
                `DELETE FROM permissions WHERE id <= ${Permissions.length}`,
                {
                    transaction,
                },
            );
        });
    },
};
