"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_classes",
      [
        {
          nameclass : "VIII - A",
        },
        {
          nameclass : "VIII - B",
        },
        {
          nameclass : "VIII - C",
        },
        
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_classes", null, {});
  },
};
