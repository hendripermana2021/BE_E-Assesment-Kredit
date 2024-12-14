'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_document_ajuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_document_ajuan.init({
    id_req: DataTypes.INTEGER,
    name_document: DataTypes.STRING,
    file: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tbl_document_ajuan',
  });
  return tbl_document_ajuan;
};