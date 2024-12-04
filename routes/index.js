import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import swaggerUI from "swagger-ui-express";
import yaml from "js-yaml";
import {
  handleGetRoot,
  Login,
  Logout,
  whoAmI,
  refreshToken,
  getDataUsers,
  getEmailUsers,
  getDataUsersId,
  deleteUsers,
  RegisterUsers,
  updateDataUsers,
} from "../controllers/HandlerUsers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createRole,
  deleteRole,
  getDataRole,
  getDataRoleById,
  getRoleBy,
  updateRole,
} from "../controllers/HandlerRole.js";
import {
  getDataNotification,
  getDataNotificationById,
} from "../controllers/HandlerNotification.js";
import {
  CalculatedROC,
  calculatedCPIByIdCalculated,
  calculatedCPIisNull,
  getReqCpiNull,
} from "../controllers/HandlerAction.js";
import {
  createKriteriaDanSub,
  deleteKriteriaDanSub,
  getDataKriteria,
  getDataKriteriaById,
  updateKriteriaDanSub,
} from "../controllers/HandlerKriteriaSubKriteria.js";
import {
  getDataAjuanById,
  getDataAjuanAll,
  updateAjuan,
  deleteAjuan,
  addAjuan,
} from "../controllers/HandlerAjuan.js";
import { dashboard } from "../controllers/HandlerDashboard.js";
import { generateReport } from "../controllers/HandlerReport.js";
import {
  deleteNasabah,
  getDataNasabah,
  getDataNasabahById,
  RegisterNasabah,
  updateDataNasabah,
} from "../controllers/HandlerDataNasabah.js";

export const prefix = "/v1/api/";

export const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/image"); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

//DOCUMENTATION API
const swaggerDocument = yaml.load(fs.readFileSync("OpenAPI.yaml", "utf8"));

router.use(
  prefix + "api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

//ROUTES FOR GLOBAL
router.get(prefix, handleGetRoot);
router.get(prefix + "me", verifyToken, whoAmI);
router.post(prefix + "login", Login);
router.get(prefix + "token", refreshToken);
router.delete(prefix + "logout", verifyToken, Logout);
router.post(prefix + "action/calculatedROC", verifyToken, CalculatedROC);
router.post(prefix + "action/calculatedCPI", verifyToken, calculatedCPIisNull);
router.get(prefix + "result/CPI/:id", verifyToken, calculatedCPIByIdCalculated);
router.get(prefix + "report", verifyToken, generateReport);
router.get(prefix + "datareqByUser", verifyToken, getReqCpiNull);

//ROUTES FOR ADMINISTRATOR
//API FOR DASHBOARD
router.get(prefix + "dashboard", verifyToken, dashboard);

//API KRITERIA DAN SUB-KRITERIA
router.get(prefix + "kriteria", verifyToken, getDataKriteria);
router.get(prefix + "kriteria/byid/:id", verifyToken, getDataKriteriaById);
router.delete(
  prefix + "kriteria/delete/:id",
  verifyToken,
  deleteKriteriaDanSub
);
router.put(prefix + "kriteria/update/:id", verifyToken, updateKriteriaDanSub);
router.post(prefix + "kriteria/create", verifyToken, createKriteriaDanSub);
//END API KRITERIA DAN SUB-KRITERIA

//API USERS
router.get(prefix + "users/email", verifyToken, getEmailUsers);
router.get(prefix + "users/byid/:id", verifyToken, getDataUsersId);
router.get(prefix + "users", verifyToken, getDataUsers);
router.delete(prefix + "users/delete/:id", verifyToken, deleteUsers);
router.post(prefix + "users/register", verifyToken, RegisterUsers);
router.put(prefix + "users/update/:id", verifyToken, updateDataUsers);

//API NASABAH
router.get(prefix + "nasabah", verifyToken, getDataNasabah);
router.get(prefix + "nasabah/byid/:id", verifyToken, getDataNasabahById);
router.post(
  prefix + "nasabah/register",
  verifyToken,
  upload.single("image"),
  RegisterNasabah
);
router.put(
  prefix + "nasabah/update/:id",
  verifyToken,
  upload.single("image"),
  updateDataNasabah
);
router.delete(prefix + "nasabah/delete/:id", verifyToken, deleteNasabah);

//API ROLE
router.get(prefix + "role", verifyToken, getDataRole);
router.get(prefix + "role/byid/:id", verifyToken, getDataRoleById);
router.get(prefix + "role/:search", verifyToken, getRoleBy);
router.post(prefix + "role/create", verifyToken, createRole);
router.put(prefix + "role/update/:id", verifyToken, updateRole);
router.delete(prefix + "role/delete/:id", verifyToken, deleteRole);

//API NOTIFICATION
router.get(prefix + "notif", verifyToken, getDataNotification);
router.get(prefix + "notif/byid/:id", verifyToken, getDataNotificationById);

//API Ajuan
router.get(prefix + "ajuan/byid/:id", verifyToken, getDataAjuanById);
router.get(prefix + "ajuan", verifyToken, getDataAjuanAll);
router.put(prefix + "ajuan/update/:id", verifyToken, updateAjuan);
router.delete(prefix + "ajuan/delete/:id", verifyToken, deleteAjuan);
router.post(prefix + "ajuan/create", verifyToken, addAjuan);

export default router;
