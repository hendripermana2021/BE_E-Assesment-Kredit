'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_alternatifs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      class: {
        type: Sequelize.INTEGER
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
      birthdate: {
        type: Sequelize.DATE
      },
      id_room: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      role_id: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tbl_alternatifs');
  }
};