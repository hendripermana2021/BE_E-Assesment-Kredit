'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_santri extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_santri.init({
    name_santri: DataTypes.STRING,
    sex: DataTypes.BOOLEAN,
    fathername: DataTypes.STRING,
    mothername: DataTypes.STRING,
    id_room: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tbl_santri',
  });
  return tbl_santri;
};