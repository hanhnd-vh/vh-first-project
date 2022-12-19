module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            const userRole = [
                {
                    role_id: 1,
                    user_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ];
            return await queryInterface.bulkInsert('user_roles', userRole, {
                transaction,
            });
        });
    },

    down: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkDelete(
                'user_roles',
                {
                    id: 1,
                },
                {
                    transaction,
                },
            );
        });
    },
};
