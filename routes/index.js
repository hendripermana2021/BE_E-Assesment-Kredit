import express from "express";
import fs from "fs";
import {
  handleGetRoot,
  LoginPegawai,
  getEmailPegawai,
  Logout,
  whoAmI,
  deletePegawai,
  RegisterPegawai,
  getDataPegawaiId,
  getDataPegawai,
  updateDataPegawai,
  getDataPegawaiBy,
} from "../controllers/HandlerUsers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
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
  createNotification,
  deleteNotification,
  getDataNotification,
  getDataNotificationById,
  readNotify,
} from "../controllers/HandlerNotification.js";
import {
  addReqAndAlternatives,
  calculatedCPI,
  createKriteriaAndCalculatedROC,
  getDataKriteriaDanSubKriteria,
} from "../controllers/HandlerAction.js";
import {
  createKriteriaDanSub,
  deleteKriteriaDanSub,
  getDataKriteria,
  getDataKriteriaById,
  updateKriteriaDanSub,
} from "../controllers/HandlerKriteriaSubKriteria.js";

export const prefix = "/v1/api/";

export const router = express.Router();

//ROUTES FOR GLOBAL
router.get(prefix, handleGetRoot);
router.get(prefix + "me", verifyToken, whoAmI);
router.post(prefix + "login", LoginPegawai);
router.delete(prefix + "logout", verifyToken, Logout);
router.post(prefix + "create/permission", verifyToken, addReqAndAlternatives);
router.post(prefix + "create/kriteria&sub", verifyToken, createKriteriaDanSub);
router.get(prefix + "kriteria&sub", verifyToken, getDataKriteria);
router.get(prefix + "kriteria&sub/:id", verifyToken, getDataKriteriaById);
router.delete(
  prefix + "kriteria&sub/delete/:id",
  verifyToken,
  deleteKriteriaDanSub
);
router.put(
  prefix + "kriteria&sub/update/:id",
  verifyToken,
  updateKriteriaDanSub
);
router.get(
  prefix + "getKriteria&Sub-kriteria",
  verifyToken,
  getDataKriteriaDanSubKriteria
);
router.post(
  prefix + "action/calculatedROC",
  verifyToken,
  createKriteriaAndCalculatedROC
);
router.post(prefix + "result/CPI", verifyToken, calculatedCPI);

//ROUTES FOR ADMINISTRATOR
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
router.put(prefix + "room/update/:id", getDataRoomById);
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
router.post(prefix + "notif/create", verifyToken, createNotification);
router.put(prefix + "notif/read", verifyToken, readNotify);
router.delete(prefix + "notif/delete/:id", verifyToken, deleteNotification);

//API SUBKRITERIA

//ROUTES FOR KEPALA PENGASUHAN

//ROUTES FOR USTADZ/AH

//ROUTES FOR PETUGAS KEAMANAN

//ROUTES FOR SANTRI
export default router;
