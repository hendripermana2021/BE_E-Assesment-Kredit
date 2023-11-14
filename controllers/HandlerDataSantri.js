import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Santri = db.tbl_santri;
export const getDataSantri = async (req, res) => {
  try {
    const santri = await Santri.findAll({});
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: santri,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataSantriById = async (req, res) => {
  const { id } = req.params;
  try {
    const santri = await Santri.findAll({
      where: { id: id },
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: santri,
    });
  } catch (error) {
    console.log(error);
  }
};

export const RegisterSantri = async (req, res) => {
  const {
    name_santri,
    sex,
    fathername,
    mothername,
    password,
    status,
    id_room,
    role_id,
  } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const santri = await Santri.create({
      name_santri,
      sex,
      fathername,
      mothername,
      password: hashPassword,
      status,
      id_room,
      role_id: 5,
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Register Data Santri berhasil",
      data: santri,
    });
  } catch (error) {
    console.log(error);
  }
};
