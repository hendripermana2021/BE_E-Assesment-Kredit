'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_room.init({
    id_ustadz: DataTypes.INTEGER,
    nameroom: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_room',
  });
  return tbl_room;
};