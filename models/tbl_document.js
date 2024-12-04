'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_document.init({
    id_nasabah: DataTypes.INTEGER,
    name_document: DataTypes.STRING,
    file: DataTypes.STRING,
    id_req: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_document',
  });
  return tbl_document;
};