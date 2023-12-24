'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_santris', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_santri: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.BOOLEAN
      },
      fathername: {
        type: Sequelize.STRING
      },
      mothername: {
        type: Sequelize.STRING
      },
      id_room: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      accesstoken: {
        type: Sequelize.TEXT
      },
      refreshtoken: {
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
    await queryInterface.dropTable('tbl_santris');
  }
};