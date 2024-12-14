"use strict";
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_users",
      [
        {
          name_user: "Irma",
          gender: "Female",
          email: "irma@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_user: "Petugas",
          gender: "Male",
          email: "petugas@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_users", null, {});
  },
};
