'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_edas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_edas.init({
    user_id: DataTypes.INTEGER,
    id_kriteria: DataTypes.INTEGER,
    id_value: DataTypes.INTEGER,
    id_order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_edas',
  });
  return tbl_edas;
};