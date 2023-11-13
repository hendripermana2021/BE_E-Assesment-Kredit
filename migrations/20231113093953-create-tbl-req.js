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
      user_id: {
        type: Sequelize.INTEGER
      },
      status_req: {
        type: Sequelize.BOOLEAN
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      date_start: {
        type: Sequelize.DATE
      },
      time_start: {
        type: Sequelize.TIME
      },
      date_end: {
        type: Sequelize.DATE
      },
      time_end: {
        type: Sequelize.TIME
      },
      cpi_result: {
        type: Sequelize.FLOAT
      },
      commented: {
        type: Sequelize.STRING
      },
      validation: {
        type: Sequelize.BOOLEAN
      },
      validation_by: {
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
    await queryInterface.dropTable('tbl_reqs');
  }
};