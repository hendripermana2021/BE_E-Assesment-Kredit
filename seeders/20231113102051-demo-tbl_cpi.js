"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_cpis",
      [
        {
          id_kriteria: 1,
          id_subkriteria: 3,
          id_order: 1,
        },
        {
          id_kriteria: 2,
          id_subkriteria: 9,
          id_order: 1,
        },
        {
          id_kriteria: 3,
          id_subkriteria: 13,
          id_order: 1,
        },
        {
          id_kriteria: 4,
          id_subkriteria: 15,
          id_order: 1,
        },
        {
          id_kriteria: 5,
          id_subkriteria: 18,
          id_order: 1,
        },
        {
          id_kriteria: 6,
          id_subkriteria: 21,
          id_order: 1,
        },
        {
          id_kriteria: 1,
          id_subkriteria: 1,
          id_order: 2,
        },
        {
          id_kriteria: 2,
          id_subkriteria: 8,
          id_order: 2,
        },
        {
          id_kriteria: 3,
          id_subkriteria: 11,
          id_order: 2,
        },
        {
          id_kriteria: 4,
          id_subkriteria: 14,
          id_order: 2,
        },
        {
          id_kriteria: 5,
          id_subkriteria: 17,
          id_order: 2,
        },
        {
          id_kriteria: 6,
          id_subkriteria: 20,
          id_order: 2,
        },
        {
          id_kriteria: 1,
          id_subkriteria: 1,
          id_order: 3,
        },
        {
          id_kriteria: 2,
          id_subkriteria: 8,
          id_order: 3,
        },
        {
          id_kriteria: 3,
          id_subkriteria: 13,
          id_order: 3,
        },
        {
          id_kriteria: 4,
          id_subkriteria: 15,
          id_order: 3,
        },
        {
          id_kriteria: 5,
          id_subkriteria: 18,
          id_order: 3,
        },
        {
          id_kriteria: 6,
          id_subkriteria: 21,
          id_order: 3,
        },
        {
          id_kriteria: 1,
          id_subkriteria: 1,
          id_order: 4,
        },
        {
          id_kriteria: 2,
          id_subkriteria: 8,
          id_order: 4,
        },
        {
          id_kriteria: 3,
          id_subkriteria: 13,
          id_order: 4,
        },
        {
          id_kriteria: 4,
          id_subkriteria: 14,
          id_order: 4,
        },
        {
          id_kriteria: 5,
          id_subkriteria: 17,
          id_order: 4,
        },
        {
          id_kriteria: 6,
          id_subkriteria: 20,
          id_order: 4,
        },
        {
          id_kriteria: 1,
          id_subkriteria: 2,
          id_order: 5,
        },
        {
          id_kriteria: 2,
          id_subkriteria: 9,
          id_order: 5,
        },
        {
          id_kriteria: 3,
          id_subkriteria: 13,
          id_order: 5,
        },
        {
          id_kriteria: 4,
          id_subkriteria: 15,
          id_order: 5,
        },
        {
          id_kriteria: 5,
          id_subkriteria: 17,
          id_order: 5,
        },
        {
          id_kriteria: 6,
          id_subkriteria: 21,
          id_order: 5,
        },
        {
          id_kriteria: 1,
          id_subkriteria: 1,
          id_order: 6,
        },
        {
          id_kriteria: 2,
          id_subkriteria: 9,
          id_order: 6,
        },
        {
          id_kriteria: 3,
          id_subkriteria: 13,
          id_order: 6,
        },
        {
          id_kriteria: 4,
          id_subkriteria: 14,
          id_order: 6,
        },
        {
          id_kriteria: 5,
          id_subkriteria: 17,
          id_order: 6,
        },
        {
          id_kriteria: 6,
          id_subkriteria: 20,
          id_order: 6,
        },
        {
          id_kriteria: 1,
          id_subkriteria: 5,
          id_order: 7,
        },
        {
          id_kriteria: 2,
          id_subkriteria: 9,
          id_order: 7,
        },
        {
          id_kriteria: 3,
          id_subkriteria: 12,
          id_order: 7,
        },
        {
          id_kriteria: 4,
          id_subkriteria: 15,
          id_order: 7,
        },
        {
          id_kriteria: 5,
          id_subkriteria: 17,
          id_order: 7,
        },
        {
          id_kriteria: 6,
          id_subkriteria: 21,
          id_order: 7,
        },
        {
          id_kriteria: 1,
          id_subkriteria: 1,
          id_order: 8,
        },
        {
          id_kriteria: 2,
          id_subkriteria: 8,
          id_order: 8,
        },
        {
          id_kriteria: 3,
          id_subkriteria: 13,
          id_order: 8,
        },
        {
          id_kriteria: 4,
          id_subkriteria: 15,
          id_order: 8,
        },
        {
          id_kriteria: 5,
          id_subkriteria: 17,
          id_order: 8,
        },
        {
          id_kriteria: 6,
          id_subkriteria: 21,
          id_order: 8,
        },
        {
          id_kriteria: 1,
          id_subkriteria: 1,
          id_order: 9,
        },
        {
          id_kriteria: 2,
          id_subkriteria: 8,
          id_order: 9,
        },
        {
          id_kriteria: 3,
          id_subkriteria: 12,
          id_order: 9,
        },
        {
          id_kriteria: 4,
          id_subkriteria: 15,
          id_order: 9,
        },
        {
          id_kriteria: 5,
          id_subkriteria: 17,
          id_order: 9,
        },
        {
          id_kriteria: 6,
          id_subkriteria: 21,
          id_order: 9,
        },
        {
          id_kriteria: 1,
          id_subkriteria: 4,
          id_order: 10,
        },
        {
          id_kriteria: 2,
          id_subkriteria: 9,
          id_order: 10,
        },
        {
          id_kriteria: 3,
          id_subkriteria: 12,
          id_order: 10,
        },
        {
          id_kriteria: 4,
          id_subkriteria: 14,
          id_order: 10,
        },
        {
          id_kriteria: 5,
          id_subkriteria: 17,
          id_order: 10,
        },
        {
          id_kriteria: 6,
          id_subkriteria: 21,
          id_order: 10,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_cpis", null, {});
  },
};
