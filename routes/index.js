import express from "express";
import fs from "fs";
import { handleGetRoot } from "../controllers/HandlerUsers.js";

const prefix = "/v1/api/";

const router = express.Router();


//ROUTES FOR USERS
router.get(prefix, handleGetRoot);
export default router;
