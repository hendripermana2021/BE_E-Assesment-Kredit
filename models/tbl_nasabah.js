"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_nasabah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_nasabah.init(
    {
      name_nasabah: DataTypes.STRING,
      gender: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
      marital_status: DataTypes.STRING,
      fathername: DataTypes.STRING,
      mothername: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      no_hp: DataTypes.INTEGER,
      place_of_birth: DataTypes.STRING,
      birthday: DataTypes.DATE,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      nik: DataTypes.INTEGER,
      job_title: DataTypes.STRING,
      monthly_income: DataTypes.FLOAT,
      employment_status: DataTypes.STRING,
      work_address: DataTypes.STRING,
      long_work_at_company: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_nasabah",
    }
  );
  return tbl_nasabah;
};
