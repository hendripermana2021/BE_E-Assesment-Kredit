'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_value extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_value.init({
    name_sub: DataTypes.STRING,
    id_kriteria: DataTypes.INTEGER,
    value: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'tbl_value',
  });
  return tbl_value;
};