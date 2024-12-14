'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_aset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_aset.init({
    id_nasabah: DataTypes.INTEGER,
    jenis_aset: DataTypes.STRING,
    description_aset: DataTypes.TEXT,
    nilai_aset: DataTypes.FLOAT,
    kondisi_aset: DataTypes.STRING,
    lokasi_aset: DataTypes.STRING,
    keterangan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tbl_aset',
  });
  return tbl_aset;
};