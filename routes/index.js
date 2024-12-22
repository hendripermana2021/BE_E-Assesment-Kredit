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
  createSubKriteria,
  deleteKriteriaDanSub,
  deleteSubKriteria,
  getDataKriteria,
  getDataKriteriaAndSub,
  getDataKriteriaAndSubById,
  getDataKriteriaById,
  getDataSubKriteriaById,
  updateKriteriaDanSub,
  updateSubKriteria,
} from "../controllers/HandlerKriteriaSubKriteria.js";
import {
  getDataAjuanById,
  getDataAjuanAll,
  updateAjuan,
  deleteAjuan,
  addAjuan,
  getDataAjuanNullGenerated,
  getDataAjuanHistory,
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
import {
  addDocumentToReq,
  deleteDocumentFromReq,
  updateDocumentToReq,
} from "../controllers/HandlerDocReq.js";

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
router.get(prefix + "action/calculatedROC", verifyToken, CalculatedROC);
router.get(prefix + "action/calculatedCPI", verifyToken, calculatedCPIisNull);
router.get(prefix + "result/CPI/:id", verifyToken, calculatedCPIByIdCalculated);
router.get(prefix + "report", verifyToken, generateReport);
router.get(prefix + "datareqByUser", verifyToken, getReqCpiNull);

//ROUTES FOR ADMINISTRATOR
//API FOR DASHBOARD
router.get(prefix + "dashboard", verifyToken, dashboard);

//API KRITERIA
router.get(prefix + "kriteria", verifyToken, getDataKriteria);
router.get(prefix + "kriteria/byid/:id", verifyToken, getDataKriteriaById);

//API SUB KRITERIA
//TODO : make sub-kriteria by kriteria ID
router.get(prefix + "kriteria-sub", verifyToken, getDataKriteriaAndSub);

//END API SUB KRITERIA

//API KRITERIA DAN SUB-KRITERIA
router.get(prefix + "kriteria-sub", verifyToken, getDataKriteriaAndSub);
router.get(
  prefix + "kriteria-sub/byid/:id",
  verifyToken,
  getDataKriteriaAndSubById
);
router.put(
  prefix + "kriteria-sub/update/:id",
  verifyToken,
  updateKriteriaDanSub
);
router.post(prefix + "kriteria-sub/create", verifyToken, createKriteriaDanSub);
router.delete(
  prefix + "kriteria-sub/delete/:id",
  verifyToken,
  deleteKriteriaDanSub
);
// END API KRITERIA

//API SUB-KRITERIA
router.get(
  prefix + "sub-kriteria/byid/:id",
  verifyToken,
  getDataSubKriteriaById
);
router.delete(
  prefix + "sub-kriteria/delete/:id",
  verifyToken,
  deleteSubKriteria
);
router.put(prefix + "sub-kriteria/update/:id", verifyToken, updateSubKriteria);
router.post(prefix + "sub-kriteria/create", verifyToken, createSubKriteria);
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
router.post(prefix + "nasabah/register", verifyToken, RegisterNasabah);
router.put(prefix + "nasabah/update/:id", verifyToken, updateDataNasabah);
router.delete(prefix + "nasabah/delete/:id", verifyToken, deleteNasabah);

//API ROLE
router.get(prefix + "role", getDataRole);
router.get(prefix + "role/byid/:id", getDataRoleById);
router.get(prefix + "role/:search", getRoleBy);
router.post(prefix + "role/create", createRole);
router.put(prefix + "role/update/:id", updateRole);
router.delete(prefix + "role/delete/:id", deleteRole);

//API NOTIFICATION
router.get(prefix + "notif", verifyToken, getDataNotification);
router.get(prefix + "notif/byid/:id", verifyToken, getDataNotificationById);

//API Ajuan
router.get(prefix + "ajuan/byid/:id", verifyToken, getDataAjuanById);
router.get(prefix + "ajuan", verifyToken, getDataAjuanAll);
router.get(prefix + "ajuan/history", verifyToken, getDataAjuanHistory);
router.get(prefix + "ajuan/generated", verifyToken, getDataAjuanNullGenerated);
router.put(prefix + "ajuan/update/:id", verifyToken, updateAjuan);
router.delete(prefix + "ajuan/delete/:id", verifyToken, deleteAjuan);
router.post(prefix + "ajuan/create", verifyToken, addAjuan);

//ADDITIONAL AJUAN
router.post(
  prefix + "ajuan/document/create/:id",
  verifyToken,
  upload.single("file"),
  addDocumentToReq
);
router.put(
  prefix + "ajuan/document/update/:id",
  verifyToken,
  updateDocumentToReq
);
router.delete(
  prefix + "ajuan/document/delete/:id",
  verifyToken,
  deleteDocumentFromReq
);

export default router;
