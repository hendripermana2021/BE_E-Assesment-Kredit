'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_contact.init({
    family_relationship: DataTypes.STRING,
    name_family: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    id_nasabah: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_contact',
  });
  return tbl_contact;
};