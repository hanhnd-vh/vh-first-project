'use strict';

/** @type {import('sequelize-cli').Migration} */
const permissions = [
    'CREATE_USER',
    'READ_USER',
    'UPDATE_USER',
    'DELETE_USER',
    'CREATE_ROLE',
    'READ_ROLE',
    'UPDATE_ROLE',
    'DELETE_ROLE',
];

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'permissions',
            permissions.map((permission, index) => {
                return {
                    id: index + 1,
                    name: permission,
                    created_at: new Date(),
                    updated_at: new Date(),
                };
            })
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
