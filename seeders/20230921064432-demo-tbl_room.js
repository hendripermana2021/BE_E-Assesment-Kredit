"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_rooms",
      [
        {
          id_ustadz: 2,
          nameroom: "Abu Bakar 1",
        },
        {
          id_ustadz: 1,
          nameroom: "Abu Bakar 2",
        },
        {
          id_ustadz: 2,
          nameroom: "Abu Bakar 3",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_rooms", null, {});
  },
};
