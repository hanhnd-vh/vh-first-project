const Permissions = [
    'CREATE_USER',
    'READ_USER',
    'UPDATE_USER_PROFILE',
    'CHANGE_PASSWORD',
    'CHANGE_USER_ROLES',
    'DELETE_USER',
    'CREATE_ROLE',
    'READ_ROLE',
    'UPDATE_ROLE',
    'DELETE_ROLE',
];
module.exports = {
    up: async (queryInterface) => {
        return await queryInterface.sequelize.transaction(async (transaction) => {
            return await queryInterface.bulkInsert(
                'permissions',
                Permissions.map((permission) => {
                    return {
                        name: permission,
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
                `DELETE FROM permissions WHERE id <= ${Permissions.length}`,
                {
                    transaction,
                },
            );
        });
    },
};
