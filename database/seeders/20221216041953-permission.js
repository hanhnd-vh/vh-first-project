'use strict';

/** @type {import('sequelize-cli').Migration} */
const actionIds = [1, 2, 3, 4];
const resourceIds = [1];

const permissions = [];
actionIds.forEach((actionId) => {
    resourceIds.forEach((resourceId) => {
        permissions.push({
            action_id: actionId,
            resource_id: resourceId,
            created_at: new Date(),
            updated_at: new Date(),
        });
    });
});
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('permissions', permissions);
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
