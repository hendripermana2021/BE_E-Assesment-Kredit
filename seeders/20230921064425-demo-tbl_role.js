"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_roles",
      [
        {
          role_name: "Administrator",
        },
        {
          role_name: "Kepala Pengasuhan",
        },
        {
          role_name: "Ustadz/ah",
        },
        {
          role_name: "Petugas Keamanan",
        },
        {
          role_name: "Santri",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_roles", null, {});
  },
};
