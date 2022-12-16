'use strict';

/** @type {import('sequelize-cli').Migration} */
const roles = ['ADMIN', 'USER'];

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'roles',
            roles.map((role) => {
                return {
                    name: role,
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
