"use strict";
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_pegawais",
      [
        {
          name_pegawai: "Hendri Permana",
          sex: 1,
          email: "hendripermana60@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role_id: 5,
        },
        {
          name_pegawai: "Setia Darma",
          sex: 1,
          email: "setia@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role_id: 2,
        },
        {
          name_pegawai: "Yusuf",
          sex: 1,
          email: "yusuf@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_pegawai: "Rasyid",
          sex: 1,
          email: "rasyid@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role_id: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_pegawais", null, {});
  },
};
