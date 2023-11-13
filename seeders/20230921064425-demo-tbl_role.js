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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_roles", null, {});
  },
};
