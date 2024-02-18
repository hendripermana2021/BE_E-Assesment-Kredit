import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Santri = db.tbl_santri;
const Room = db.tbl_room;
const Pegawai = db.tbl_pegawai;
export const getDataSantri = async (req, res) => {
  try {
    const santri = await Santri.findAll({
      include: {
        model: Room,
        as: "nameroom",
        include: {
          model: Pegawai,
          as: "walikamar",
        },
      },
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

export const getDataSantriById = async (req, res) => {
  const { id } = req.params;
  try {
    const santri = await Santri.findAll({
      where: { id: id },
    });
    if (santri == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }
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

export const getSantriBy = async (req, res) => {
  try {
    const { search } = req.params;
    let santri = await Santri.findAll({
      where: {
        [Op.or]: [{ name_santri: { [Op.like]: `%` + search + `%` } }],
      },
    });
    if (santri == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Santri Doesn't Existing",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data Santri you searched Found",
      data: santri,
    });
  } catch (error) {
    console.log(error);
  }
};

export const RegisterSantri = async (req, res) => {
  const { name_santri, sex, fathername, mothername, id_room } = req.body;

  try {
    const santri = await Santri.create({
      name_santri,
      sex,
      fathername,
      mothername,
      status: 1,
      id_room,
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Register Data Santri Successfully",
      data: santri,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSantri = async (req, res) => {
  const { id } = req.params;
  const dataBefore = await Santri.findOne({
    where: { id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Data Santri doesn't exist or has been deleted!",
    });
  }

  await Santri.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Santri Successfully",
    data: dataBefore,
  });
};

export const updateDataSantri = async (req, res) => {
  const { id } = req.params;

  try {
    const data_before = await Santri.findOne({
      where: { id },
    });

    if (data_before == null) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Santri doesn't exist or has been deleted!",
      });
    }

    const { name_santri, sex, fathername, mothername, password, id_room } =
      req.body;

    const santri = await Santri.update(
      {
        name_santri,
        sex,
        fathername,
        mothername,
        password,
        id_room,
      },
      {
        where: { id },
      }
    );

    const data_update = await Santri.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Data Santri Success Updated",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.log(error);
  }
};
