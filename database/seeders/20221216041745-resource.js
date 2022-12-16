'use strict';

/** @type {import('sequelize-cli').Migration} */
const resources = ['USER'];

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'resources',
            resources.map((resource) => {
                return {
                    name: resource,
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
