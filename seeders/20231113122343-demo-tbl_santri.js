"use strict";
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_santris",
      [
        {
          name_santri: "Fiqrie Habibie Marasabessy",
          sex: 1,
          fathername: "Jono",
          mothername: "siti",
          password: await bcrypt.hash("12345", 10),
          status: 0,
          id_room: 1,
          role_id: 5,
        },
        {
          name_santri: "Najla Amiraturrizqi Panggabean",
          sex: 0,
          fathername: "Jono",
          mothername: "siti",
          password: await bcrypt.hash("12345", 10),
          status: 0,
          id_room: 1,
          role_id: 5,
        },
        {
          name_santri: "Dava Hardinata",
          sex: 1,
          fathername: "Jono",
          mothername: "siti",
          password: await bcrypt.hash("12345", 10),
          status: 0,
          id_room: 1,
          role_id: 5,
        },
        {
          name_santri: "Ahmad Syaufa Al Khairi",
          sex: 1,
          fathername: "Jono",
          mothername: "siti",
          password: await bcrypt.hash("12345", 10),
          status: 0,
          id_room: 1,
          role_id: 5,
        },
        {
          name_santri: "Amir Hakim Nasution",
          sex: 1,
          fathername: "Jono",
          mothername: "siti",
          password: await bcrypt.hash("12345", 10),
          status: 0,
          id_room: 1,
          role_id: 5,
        },
        {
          name_santri: "Dhanis Herman Piliang",
          sex: 1,
          fathername: "Jono",
          mothername: "siti",
          password: await bcrypt.hash("12345", 10),
          status: 0,
          id_room: 1,
          role_id: 5,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_santris", null, {});
  },
};
