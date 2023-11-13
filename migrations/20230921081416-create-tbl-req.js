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
      edas_result: {
        type: Sequelize.FLOAT
      },
      id_order: {
        type: Sequelize.INTEGER
      },
      commented: {
        type: Sequelize.STRING
      },
      validation: {
        type: Sequelize.BOOLEAN
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