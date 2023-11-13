"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_cpis", [""], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_cpis", null, {});
  },
};
