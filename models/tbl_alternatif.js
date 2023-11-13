'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_alternatif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_alternatif.init({
    name: DataTypes.STRING,
    class: DataTypes.INTEGER,
    sex: DataTypes.BOOLEAN,
    fathername: DataTypes.STRING,
    mothername: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    id_room: DataTypes.INTEGER,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    role_id: DataTypes.STRING,
    accesstoken: DataTypes.TEXT,
    refreshtoken: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tbl_alternatif',
  });
  return tbl_alternatif;
};