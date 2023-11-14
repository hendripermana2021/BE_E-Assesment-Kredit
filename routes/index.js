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
} from "../controllers/HandlerUsers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  RegisterSantri,
  getDataSantri,
  getDataSantriById,
} from "../controllers/HandlerDataSantri.js";

const prefix = "/v1/api/";

const router = express.Router();

//ROUTES FOR GLOBAL
router.get(prefix, handleGetRoot);
router.get(prefix + "me", verifyToken, whoAmI);
router.post(prefix + "login", LoginPegawai);
router.delete(prefix + "logout", verifyToken, Logout);

//ROUTES FOR ADMINISTRATOR
//API PEGAWAI
router.get(prefix + "pegawai/email", getEmailPegawai);
router.get(prefix + "pegawai/:id", getDataPegawaiId);
router.get(prefix + "pegawai", getDataPegawai);
router.delete(prefix + "pegawai/delete/:id", deletePegawai);
router.post(prefix + "pegawai/register", RegisterPegawai);
router.put(prefix + "pegawai/update/:id", updateDataPegawai);

//API SANTRI
router.get(prefix + "santri", getDataSantri);
router.get(prefix + "santri/:id", getDataSantriById);
router.post(prefix + "santri/register", RegisterSantri);

//ROUTES FOR KEPALA PENGASUHAN

//ROUTES FOR USTADZ/AH

//ROUTES FOR PETUGAS KEAMANAN

//ROUTES FOR SANTRI
export default router;
