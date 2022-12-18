const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            const hashedPassword = await bcrypt.hash('password', 10);
            const user = [
                {
                    username: 'vuihoc',
                    password: hashedPassword,
                    email: 'vh@vuihoc.vn',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ];
            return await queryInterface.bulkInsert('users', user, {
                transaction,
            });
        });
    },

    down: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkDelete(
                'users',
                {
                    username: 'vuihoc',
                },
                {
                    transaction,
                },
            );
        });
    },
};
