"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_kriteria",
      [
        {
          scale_priority: 1,
          name_kriteria: "Keterangan Perizinan",
          weight_score: null,
          type: 1,
        },
        {
          scale_priority: 2,
          name_kriteria: "Penanganan Medis",
          weight_score: null,
          type: 1,
        },
        {
          scale_priority: 3,
          name_kriteria: "Lama Sakit",
          weight_score: null,
          type: 1,
        },
        {
          scale_priority: 4,
          name_kriteria: "Lama Izin",
          weight_score: null,
          type: 0,
        },
        {
          scale_priority: 5,
          name_kriteria: "Hubungan Penjemput",
          weight_score: null,
          type: 1,
        },
        {
          scale_priority: 6,
          name_kriteria: "Disiplin Santri / Performa Santri",
          weight_score: null,
          type: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_kriteria", null, {});
  },
};
