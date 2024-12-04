'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_reqs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_nasabah: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      cpi_result: {
        type: Sequelize.FLOAT
      },
      commented: {
        type: Sequelize.STRING
      },
      id_calculated: {
        type: Sequelize.INTEGER
      },
      status_ajuan: {
        type: Sequelize.STRING
      },
      id_calculated: {
        type: Sequelize.INTEGER
      },
      jlh_dana: {
        type: Sequelize.FLOAT
      },
      purpose_req: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tbl_reqs');
  }
};