const Roles = ['ADMIN', 'USER'];

module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkInsert(
                'roles',
                Roles.map((role) => {
                    return {
                        name: role,
                        created_at: new Date(),
                        updated_at: new Date(),
                    };
                }),
                {
                    transaction,
                },
            );
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
