'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_asets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_nasabah: {
        type: Sequelize.INTEGER
      },
      jenis_aset: {
        type: Sequelize.STRING
      },
      description_aset: {
        type: Sequelize.TEXT
      },
      nilai_aset: {
        type: Sequelize.FLOAT
      },
      kondisi_aset: {
        type: Sequelize.STRING
      },
      lokasi_aset: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tbl_asets');
  }
};