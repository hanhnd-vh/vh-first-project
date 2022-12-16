'use strict';

/** @type {import('sequelize-cli').Migration} */
const actions = ['CREATE', 'READ', 'UPDATE', 'DELETE'];

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            'actions',
            actions.map((action) => {
                return {
                    name: action,
                    created_at: new Date(),
                    updated_at: new Date(),
                };
            })
        );
    },

    async down(queryInterface, Sequelize) {},
};
