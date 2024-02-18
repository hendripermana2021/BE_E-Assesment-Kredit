import express from "express";
import fs from "fs";
import {
  handleGetRoot,
  Login,
  getEmailPegawai,
  Logout,
  whoAmI,
  deletePegawai,
  RegisterPegawai,
  getDataPegawaiId,
  getDataPegawai,
  updateDataPegawai,
  getDataPegawaiBy,
  refreshToken,
} from "../controllers/HandlerUsers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/verifyRole.js";
import {
  RegisterSantri,
  deleteSantri,
  getDataSantri,
  getDataSantriById,
  getSantriBy,
  updateDataSantri,
} from "../controllers/HandlerDataSantri.js";
import {
  createRoom,
  deleteRoom,
  getDataRoom,
  getDataRoomById,
  getRoomBy,
  updateRoom,
} from "../controllers/HandlerRoom.js";
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
} from "../controllers/HandlerAction.js";
import {
  createKriteriaDanSub,
  deleteKriteriaDanSub,
  getDataKriteria,
  getDataKriteriaById,
  updateKriteriaDanSub,
} from "../controllers/HandlerKriteriaSubKriteria.js";
import {
  getDataPermissionById,
  getDataPermission,
  getDataPermissionByUserId,
  addPermission,
  updatePermission,
  deletePermission,
} from "../controllers/HandlerPermission.js";
import { dashboard } from "../controllers/HandlerDashboard.js";
import { validation, validationBack } from "../controllers/HandlerValidate.js";
import { generateReport } from "../controllers/HandlerReport.js";

export const prefix = "/v1/api/";

export const router = express.Router();

//ROUTES FOR GLOBAL
router.get(prefix, handleGetRoot);
router.get(prefix + "me", verifyToken, whoAmI);
router.post(prefix + "login", Login);
router.get(prefix + "token", refreshToken);
router.delete(prefix + "logout", verifyToken, Logout);
router.post(prefix + "action/calculatedROC", verifyToken, CalculatedROC);
router.post(prefix + "result/CPI", verifyToken, calculatedCPIisNull);
router.get(prefix + "result/CPI/:id", verifyToken, calculatedCPIByIdCalculated);
router.get(prefix + "report", verifyToken, generateReport);

//ROUTES FOR ADMINISTRATOR
//API FOR DASHBOARD
router.get(prefix + "dashboard", verifyToken, dashboard);

//API KRITERIA DAN SUB-KRITERIA
router.get(prefix + "kriteria", getDataKriteria);
router.get(prefix + "kriteria/byid/:id", getDataKriteriaById);
router.delete(prefix + "kriteria/delete/:id", deleteKriteriaDanSub);
router.put(prefix + "kriteria/update/:id", updateKriteriaDanSub);
router.post(prefix + "kriteria/create", createKriteriaDanSub);
//END API KRITERIA DAN SUB-KRITERIA

//API PEGAWAI
router.get(prefix + "pegawai/email", getEmailPegawai);
router.get(prefix + "pegawai/byid/:id", getDataPegawaiId);
router.get(prefix + "pegawai/:search", getDataPegawaiBy);
router.get(prefix + "pegawai", getDataPegawai);
router.get(prefix + "secret", getDataPegawai);
router.delete(prefix + "pegawai/delete/:id", deletePegawai);
router.post(prefix + "pegawai/register", RegisterPegawai);
router.put(prefix + "pegawai/update/:id", updateDataPegawai);

//API SANTRI
router.get(prefix + "santri", getDataSantri);
router.get(prefix + "santri/byid/:id", getDataSantriById);
router.get(prefix + "santri/:search", getSantriBy);
router.post(prefix + "santri/register", RegisterSantri);
router.put(prefix + "santri/update/:id", updateDataSantri);
router.delete(prefix + "santri/delete/:id", deleteSantri);

//API ROOM
router.get(prefix + "room", getDataRoom);
router.get(prefix + "room/byid/:id", getDataRoomById);
router.get(prefix + "room/:search", getRoomBy);
router.post(prefix + "room/create", createRoom);
router.put(prefix + "room/update/:id", updateRoom);
router.delete(prefix + "room/delete/:id", deleteRoom);

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

//API SUBKRITERIA

//API PERMISSION
router.get(prefix + "permission/all", getDataPermission);
router.get(prefix + "permission/byid/:id", getDataPermissionById);
router.get(prefix + "permission", verifyToken, getDataPermissionByUserId);
router.put(prefix + "permission/update/:id", verifyToken, updatePermission);
router.delete(prefix + "permission/delete/:id", verifyToken, deletePermission);
router.post(prefix + "permission/create", verifyToken, addPermission);

//ROUTES FOR KEPALA PENGASUHAN

//ROUTES FOR USTADZ/AH

//ROUTES FOR PETUGAS KEAMANAN
router.put(prefix + "validation/code", verifyToken, validation);
router.put(prefix + "validation-back/code", verifyToken, validationBack);

//ROUTES FOR SANTRI
export default router;
