"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_reqs",
      [
        {
          user_id : 1,
          status_req : true,
          date_start : "2023-09-20",
          time_start : "17:05:25",
          date_end : "2023-09-21",
          time_end : "17:05:25",
          edas_result : null,
          id_order : 1,
          commented : "Sakit karena pulang",
          validation : false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_reqs", null, {});
  },
};
