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
    start_permission: DataTypes.DATE,
    end_permission: DataTypes.DATE,
    cpi_result: DataTypes.FLOAT,
    commented: DataTypes.STRING,
    validation_code: DataTypes.STRING,
    permission_status: DataTypes.BOOLEAN,
    val_go_by: DataTypes.INTEGER,
    val_back_by: DataTypes.INTEGER,
    id_calculated: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_req',
  });
  return tbl_req;
};