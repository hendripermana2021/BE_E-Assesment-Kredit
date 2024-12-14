'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_income.init({
    id_nasabah: DataTypes.INTEGER,
    id_req: DataTypes.INTEGER,
    sumber_pendapatan: DataTypes.STRING,
    jenis_pendapatan: DataTypes.STRING,
    nilai_pendapatan: DataTypes.FLOAT,
    durasi_pendapatan: DataTypes.INTEGER,
    keterangan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tbl_income',
  });
  return tbl_income;
};