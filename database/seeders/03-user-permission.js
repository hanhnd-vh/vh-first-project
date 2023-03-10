const { seedingUserRoles } = require('../constants/seeding-constants');

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkInsert('user_roles', seedingUserRoles, {
                transaction,
            });
        });
    },

    down: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkDelete(
                'user_roles',
                {
                    id: seedingUserRoles.map((userRole) => userRole.id),
                },
                {
                    transaction,
                },
            );
        });
    },
};
