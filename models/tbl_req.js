"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_req extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_req.init(
    {
      id_nasabah: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      rank: DataTypes.INTEGER,
      cpi_result: DataTypes.FLOAT,
      commented: DataTypes.STRING,
      id_calculated: DataTypes.INTEGER,
      status_ajuan: DataTypes.STRING,
      id_calculated: DataTypes.INTEGER,
      jlh_dana: DataTypes.FLOAT,
      purpose_req: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tbl_req",
    }
  );
  return tbl_req;
};
