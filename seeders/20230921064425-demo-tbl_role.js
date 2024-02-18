"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_roles",
      [
        {
          role_name: "Administrator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_name: "Ustadz/ah",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_name: "Petugas Keamanan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_name: "Santri",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_roles", null, {});
  },
};
