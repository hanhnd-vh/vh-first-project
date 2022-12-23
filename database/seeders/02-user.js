const { seedingUsers } = require('../constants/seeding-constants');

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkInsert('users', seedingUsers, {
                transaction,
            });
        });
    },

    down: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkDelete(
                'users',
                {
                    id: seedingUsers.map((user) => user.id),
                },
                {
                    transaction,
                },
            );
        });
    },
};
