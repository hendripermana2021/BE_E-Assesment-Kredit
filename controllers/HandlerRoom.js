import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Room = db.tbl_room;
export const getDataRoom = async (req, res) => {
  try {
    const room = await Room.findAll({});
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: room,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findAll({
      where: { id: id },
    });
    if (room == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Room Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: room,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRoomBy = async (req, res) => {
  try {
    const { search } = req.params;
    let room = await Room.findAll({
      where: {
        [Op.or]: [{ nameroom: { [Op.like]: `%` + search + `%` } }],
      },
    });
    if (room == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Room Doesn't Existing",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data Room you searched Found",
      data: room,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createRoom = async (req, res) => {
  const { id_ustadz, nameroom } = req.body;

  try {
    const room = await Room.create({
      id_ustadz,
      nameroom,
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Register Data Santri berhasil",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  const dataBefore = await Room.findOne({
    where: { id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Data Room doesn't exist or has been deleted!",
    });
  }

  await Room.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Room Successfully",
    data: dataBefore,
  });
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const dataBeforeDelete = await Room.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Data Room doesn't exist or has been deleted!",
    });
  }

  const { id_ustadz, nameroom } = req.body;

  try {
    const room = await Room.update(
      {
        id_ustadz,
        nameroom,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Users Success Updated",
      data_before: dataBeforeDelete,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
  }
};
