"use strict";
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_nasabahs",
      [
        {
          name_nasabah: "Riyana",
          id_user: 1,
          gender: "Female",
          marital_status: "Belum Menikah",
          fathername: "Sudirman",
          mothername: "Siti Aisyah",
          status: true,
          no_hp: "081234567890",
          place_of_birth: "Medan",
          birthday: new Date("1990-05-10"),
          address: "Jl. Merdeka No. 10, Medan",
          image: "profile_riyana.jpg",
          nik: "1234567890123456",
          job_title: "Admin",
          monthly_income: "5000000",
          employment_status: "Bekerja",
          work_address: "PT. Sukses Jaya, Medan",
          long_work_at_company: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_nasabah: "Suriadi",
          id_user: 1,
          gender: "Male",
          marital_status: "Menikah",
          fathername: "Mulyadi",
          mothername: "Rita Suryani",
          status: true,
          no_hp: "081298765432",
          place_of_birth: "Jakarta",
          birthday: new Date("1985-11-25"),
          address: "Jl. Sudirman No. 5, Jakarta",
          image: "profile_suriadi.jpg",
          nik: "2345678901234567",
          job_title: "Manager",
          monthly_income: "12000000",
          employment_status: "Bekerja",
          work_address: "PT. Maju Jaya, Jakarta",
          long_work_at_company: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_nasabah: "Balas Tarigan",
          id_user: 1,
          gender: "Male",
          marital_status: "Belum Menikah",
          fathername: "Tarigan",
          mothername: "Amelia",
          status: true,
          no_hp: "082345678901",
          place_of_birth: "Bandung",
          birthday: new Date("1992-06-15"),
          address: "Jl. Cihampelas No. 20, Bandung",
          image: "profile_balas.jpg",
          nik: "3456789012345678",
          job_title: "Supervisor",
          monthly_income: "8000000",
          employment_status: "Kontrak",
          work_address: "CV. Cipta Karya, Bandung",
          long_work_at_company: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_nasabah: "Bahagia Barus",
          id_user: 1,
          gender: "Female",
          marital_status: "Menikah",
          fathername: "Barus",
          mothername: "Hasimah",
          status: true,
          no_hp: "083456789012",
          place_of_birth: "Medan",
          birthday: new Date("1988-02-20"),
          address: "Jl. Sisingamangaraja No. 30, Medan",
          image: "profile_bahagia.jpg",
          nik: "4567890123456789",
          job_title: "Pemasaran",
          monthly_income: "6000000",
          employment_status: "Bekerja",
          work_address: "PT. Sumber Rejeki, Medan",
          long_work_at_company: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_nasabah: "Faridah",
          id_user: 1,
          gender: "Female",
          marital_status: "Belum Menikah",
          fathername: "Abdul Karim",
          mothername: "Ruhama",
          status: true,
          no_hp: "089876543210",
          place_of_birth: "Surabaya",
          birthday: new Date("1995-09-01"),
          address: "Jl. Raya No. 15, Surabaya",
          image: "profile_faridah.jpg",
          nik: "5678901234567890",
          job_title: "HRD",
          monthly_income: "7000000",
          employment_status: "Bekerja",
          work_address: "PT. Karya Mandiri, Surabaya",
          long_work_at_company: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_nasabah: "Suwardi",
          id_user: 1,
          gender: "Male",
          marital_status: "Menikah",
          fathername: "Suyanto",
          mothername: "Dewi Suryani",
          status: true,
          no_hp: "085612345678",
          place_of_birth: "Yogyakarta",
          birthday: new Date("1980-03-15"),
          address: "Jl. Malioboro No. 50, Yogyakarta",
          image: "profile_suwardi.jpg",
          nik: "6789012345678901",
          job_title: "Direktur",
          monthly_income: "20000000",
          employment_status: "Bekerja",
          work_address: "PT. Jaya Abadi, Yogyakarta",
          long_work_at_company: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_nasabah: "Joni Pranata Sitepu",
          id_user: 1,
          gender: "Male",
          marital_status: "Belum Menikah",
          fathername: "Pranata Sitepu",
          mothername: "Lina Sitepu",
          status: true,
          no_hp: "081234567890",
          place_of_birth: "Medan",
          birthday: new Date("1993-07-20"),
          address: "Jl. Pahlawan No. 2, Medan",
          image: "profile_jonisitepu.jpg",
          nik: "7890123456789012",
          job_title: "Staff",
          monthly_income: "4500000",
          employment_status: "Bekerja",
          work_address: "PT. Global Nusantara, Medan",
          long_work_at_company: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_nasabah: "Risona Br Saragih",
          id_user: 1,
          gender: "Female",
          marital_status: "Menikah",
          fathername: "Saragih",
          mothername: "Martha",
          status: true,
          no_hp: "085676543210",
          place_of_birth: "Medan",
          birthday: new Date("1990-12-12"),
          address: "Jl. Merdeka No. 45, Medan",
          image: "profile_risona.jpg",
          nik: "8901234567890123",
          job_title: "Akuntan",
          monthly_income: "7500000",
          employment_status: "Bekerja",
          work_address: "CV. Mandiri Sejahtera, Medan",
          long_work_at_company: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_nasabah: "Makmur Sembiring",
          id_user: 1,
          gender: "Male",
          marital_status: "Belum Menikah",
          fathername: "Sembiring",
          mothername: "Mariana",
          status: true,
          no_hp: "081723456789",
          place_of_birth: "Medan",
          birthday: new Date("1994-08-17"),
          address: "Jl. Pasar No. 17, Medan",
          image: "profile_makmur.jpg",
          nik: "9012345678901234",
          job_title: "Teknisi",
          monthly_income: "5000000",
          employment_status: "Bekerja",
          work_address: "PT. Teknik Jaya, Medan",
          long_work_at_company: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_nasabah: "Dalan Keliat",
          id_user: 1,
          gender: "Male",
          marital_status: "Menikah",
          fathername: "Keliat",
          mothername: "Siti Zainab",
          status: true,
          no_hp: "081234567812",
          place_of_birth: "Padang",
          birthday: new Date("1986-01-15"),
          address: "Jl. Raya Padang No. 8, Padang",
          image: "profile_dalan.jpg",
          nik: "0123456789012345",
          job_title: "Teknisi",
          monthly_income: "6000000",
          employment_status: "Bekerja",
          work_address: "CV. Abadi Sejahtera, Padang",
          long_work_at_company: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_nasabahs", null, {});
  },
};