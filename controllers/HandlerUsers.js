import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Users = db.tbl_alternatif;

export const handleGetRoot = async (req, res) => {
    res.status(200).json({
      code: 200,
      status: "OK",
      msg: "E-Permission Status Activated",
    });
  };

  
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({});
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};