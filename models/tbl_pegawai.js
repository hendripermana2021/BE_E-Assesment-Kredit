'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_pegawai.init({
    name_pegawai: DataTypes.STRING,
    sex: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    real_password: DataTypes.STRING,
    role_id: DataTypes.STRING,
    accesstoken: DataTypes.TEXT,
    refreshtoken: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tbl_pegawai',
  });
  return tbl_pegawai;
};