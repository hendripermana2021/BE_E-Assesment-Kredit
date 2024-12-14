"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_documents",
      [
        {
          id_nasabah: 1,
          id_req: 1,
          name_document: "kartu keluarga",
          file: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_nasabah: 2,
          id_req: 2,
          name_document: "KTP",
          file: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_nasabah: 3,
          id_req: 3,
          name_document: "kartu keluarga",
          file: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_nasabah: 4,
          id_req: 4,
          name_document: "kartu keluarga",
          file: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_nasabah: 5,
          id_req: 5,
          name_document: "kartu keluarga",
          file: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_documents", null, {});
  },
};
