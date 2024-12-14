"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tbl_nasabah = require("../models/tbl_nasabah.js")(sequelize, Sequelize);
db.tbl_users = require("../models/tbl_users.js")(sequelize, Sequelize);
db.tbl_kriteria = require("../models/tbl_kriteria.js")(sequelize, Sequelize);
db.tbl_notification = require("../models/tbl_notification.js")(
  sequelize,
  Sequelize
);
db.tbl_req = require("../models/tbl_req.js")(sequelize, Sequelize);
db.tbl_role = require("../models/tbl_role.js")(sequelize, Sequelize);
db.tbl_contact = require("../models/tbl_contact.js")(sequelize, Sequelize);
db.tbl_document = require("../models/tbl_document.js")(sequelize, Sequelize);
db.tbl_subkriteria = require("../models/tbl_subkriteria.js")(
  sequelize,
  Sequelize
);
db.tbl_cpi = require("../models/tbl_cpi.js")(sequelize, Sequelize);
db.tbl_document_ajuan = require("../models/tbl_document_ajuan")(
  sequelize,
  Sequelize
);
db.tbl_document_aset = require("../models/tbl_document_aset.js")(
  sequelize,
  Sequelize
);
db.tbl_aset = require("../models/tbl_aset.js")(sequelize, Sequelize);
db.tbl_income = require("../models/tbl_income.js")(sequelize, Sequelize);

db.tbl_req.hasMany(db.tbl_cpi, {
  as: "cpi_data",
  foreignKey: "id_order",
});

//for API KRITERIA & SUBKRITERIA
db.tbl_kriteria.hasMany(db.tbl_subkriteria, {
  foreignKey: "id_kriteria",
  as: "sub_kriteria",
  sourceKey: "id",
});

//END API KRITERIA & SUBKRITERIA

//for API NASABAH
db.tbl_nasabah.hasMany(db.tbl_document, {
  foreignKey: "id_nasabah",
  as: "document",
  sourceKey: "id",
});

db.tbl_nasabah.belongsTo(db.tbl_req, {
  foreignKey: "id",
  as: "cpi",
  sourceKey: "id_nasabah",
});

db.tbl_nasabah.belongsTo(db.tbl_users, {
  foreignKey: "id_user",
  as: "pengaju",
  sourceKey: "id",
});

//END API NASABAH

//for API USERS
db.tbl_users.belongsTo(db.tbl_role, {
  as: "role",
  foreignKey: "role_id",
});

//END API USERS

//FOR API REQUEST
db.tbl_req.belongsTo(db.tbl_nasabah, {
  foreignKey: "id_nasabah",
  as: "nasabah",
});

db.tbl_req.belongsTo(db.tbl_users, {
  foreignKey: "created_by",
  as: "petugas_pengaju",
});

db.tbl_req.hasMany(db.tbl_document_ajuan, {
  foreignKey: "id_req",
  as: "document_ajuan",
  sourceKey: "id",
});

//END API REQUEST

//for API METHOD CPI and ROC
db.tbl_cpi.belongsTo(db.tbl_kriteria, {
  foreignKey: "id_kriteria",
  as: "kriteria",
  targetKey: "id",
});

db.tbl_cpi.belongsTo(db.tbl_subkriteria, {
  foreignKey: "id_subkriteria",
  as: "subkriteria",
  targetKey: "id",
});
//END API METHOD CPI and ROC

module.exports = db;
