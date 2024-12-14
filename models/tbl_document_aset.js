'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_document_aset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_document_aset.init({
    id_aset: DataTypes.INTEGER,
    name_document: DataTypes.STRING,
    file: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tbl_document_aset',
  });
  return tbl_document_aset;
};