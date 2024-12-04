'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_nasabahs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_nasabah: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      marital_status: {
        type: Sequelize.STRING
      },
      fathername: {
        type: Sequelize.STRING
      },
      mothername: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      no_hp: {
        type: Sequelize.INTEGER
      },
      place_of_birth: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      nik: {
        type: Sequelize.INTEGER
      },
      job_title: {
        type: Sequelize.STRING
      },
      monthly_income: {
        type: Sequelize.FLOAT
      },
      employment_status: {
        type: Sequelize.STRING
      },
      work_address: {
        type: Sequelize.STRING
      },
      long_work_at_company: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_nasabahs');
  }
};