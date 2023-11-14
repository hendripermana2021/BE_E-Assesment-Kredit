'use strict';
const {
  Model
} = require('sequelize');
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
  tbl_req.init({
    student_id: DataTypes.INTEGER,
    status_req: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    date_start: DataTypes.DATE,
    time_start: DataTypes.TIME,
    date_end: DataTypes.DATE,
    time_end: DataTypes.TIME,
    cpi_result: DataTypes.FLOAT,
    commented: DataTypes.STRING,
    validation: DataTypes.BOOLEAN,
    validation_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_req',
  });
  return tbl_req;
};