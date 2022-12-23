const { Roles, seedingRoles } = require('../constants/seeding-constants');

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkInsert('roles', seedingRoles, {
                transaction,
            });
        });
    },

    down: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.sequelize.query(
                `DELETE FROM roles WHERE id <= ${Roles.length}`,
                {
                    transaction,
                },
            );
        });
    },
};
