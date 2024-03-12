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
          fathername: "SHOFYODIN MARASABESSY",
          mothername: "siti",
          status: 1,
          id_room: 1,
          image: "http://localhost:8000/image/image-1.jpg",
        },
        {
          name_santri: "Najla Amiraturrizqi Panggabean",
          sex: 0,
          fathername: "SYARIFUDDIN BEY PUTRA PANGGABEAN",
          mothername: "LYLA MAYASARI NASUTION",
          status: 1,
          id_room: 1,
          image: "http://localhost:8000/image/image-9.jpg",
        },
        {
          name_santri: "Dava Hardinata",
          sex: 1,
          fathername: "MULIADI",
          mothername: "NANA SRI REZEKI",
          status: 1,
          id_room: 1,
          image: "http://localhost:8000/image/image-2.jpg",
        },
        {
          name_santri: "Ahmad Syaufa Al Khairi",
          sex: 1,
          fathername: "HAMDAH DRS",
          mothername: "ROHANA DRA",
          status: 1,
          id_room: 1,
          image: "http://localhost:8000/image/image-7.jpg",
        },
        {
          name_santri: "Amir Hakim Nasution",
          sex: 1,
          fathername: "SAHAT MARTUA NASUTION",
          mothername: "INDHA APRIANA",
          status: 1,
          id_room: 1,
          image: "http://localhost:8000/image/image-3.jpg",
        },
        {
          name_santri: "Dhanis Herman Piliang",
          sex: 1,
          fathername: "HERMAN SYAM TANJUNG",
          mothername: "NOVITA PILIANG",
          status: 1,
          id_room: 1,
          image: "http://localhost:8000/image/image-4.jpg",
        },
        {
          name_santri: "Bunga Nurmala",
          sex: 0,
          fathername: "MHD IBNU",
          mothername: "MELATI",
          status: 1,
          id_room: 1,
          image: "http://localhost:8000/image/image-8.jpg",
        },
        {
          name_santri: "Satria",
          sex: 1,
          fathername: "MHD IBNU",
          mothername: "MELATI",
          status: 1,
          id_room: 1,
          image: "http://localhost:8000/image/image-5.jpg",
        },
        {
          name_santri: "Farah Maulidani",
          sex: 0,
          fathername: "JAMALUDDIN",
          mothername: "MARIDHANIATI",
          status: 1,
          id_room: 1,
          image: "http://localhost:8000/image/image-10.jpg",
        },
        {
          name_santri: "Fazri Alfarizi",
          sex: 1,
          fathername: "BOTRINALDI",
          mothername: "HALIMATUSSAKDIAH",
          status: 1,
          id_room: 1,
          image: "http://localhost:8000/image/image-6.jpg",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_santris", null, {});
  },
};
