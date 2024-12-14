'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_incomes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_nasabah: {
        type: Sequelize.INTEGER
      },
      id_req: {
        type: Sequelize.INTEGER
      },
      sumber_pendapatan: {
        type: Sequelize.STRING
      },
      jenis_pendapatan: {
        type: Sequelize.STRING
      },
      nilai_pendapatan: {
        type: Sequelize.FLOAT
      },
      durasi_pendapatan: {
        type: Sequelize.INTEGER
      },
      keterangan: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('tbl_incomes');
  }
};