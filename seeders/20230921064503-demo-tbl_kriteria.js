"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_kriteria",
      [
        {
          scale_priority: 1,
          name_kriteria: "Pendapatan Bulanan Nasabah",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scale_priority: 2,
          name_kriteria: "Durasi Pekerjaan dan Usaha",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scale_priority: 3,
          name_kriteria: "Aset dan Jaminan",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scale_priority: 4,
          name_kriteria: "Rasio Pengeluaran terhadap pendapatan",
          weight_score: 0,
          type: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scale_priority: 5,
          name_kriteria: "Sumber pendapatan lain",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scale_priority: 6,
          name_kriteria: "Keperluan penggunaan kredit",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scale_priority: 7,
          name_kriteria: "Resiko Kredit",
          weight_score: 0,
          type: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scale_priority: 8,
          name_kriteria: "Mitigasi Resiko",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scale_priority: 9,
          name_kriteria: "Pengalaman sebelumnya dengan lembaga keuangan",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scale_priority: 10,
          name_kriteria: "Jangka waktu kredit",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          scale_priority: 11,
          name_kriteria: "Nominal pinjaman",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_kriteria", null, {});
  },
};
