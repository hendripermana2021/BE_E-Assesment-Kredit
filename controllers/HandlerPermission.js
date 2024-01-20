import db from "../models/index.js";

const Req = db.tbl_req;
const Santri = db.tbl_santri;
const Pegawai = db.tbl_pegawai;

export const getDataPermission = async (req, res) => {
  try {
    const req = await Req.findAll({
      include: [
        {
          model: Santri,
          as: "namasantri",
        },
        {
          model: Pegawai,
          as: "created_permission",
        },
        {
          model: Pegawai,
          as: "val_go_name",
        },
        {
          model: Pegawai,
          as: "val_back_name",
        },
      ],
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission",
      data: req,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPermissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const req = await Req.findAll({
      where: { id: id },
      include: [
        {
          model: Santri,
          as: "namasantri",
        },
        {
          model: Pegawai,
          as: "val_go_name",
        },
        {
          model: Pegawai,
          as: "val_back_name",
        },
      ],
    });
    if (req == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Permission Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: req,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPermissionByUserId = async (req, res) => {
  const user_id = req.user.userId;
  try {
    const req = await Req.findAll({
      where: {
        created_by: user_id,
      },
      include: {
        model: Cpi,
        as: "cpi_data",
        include: [
          {
            model: Kriteria,
            as: "kriteria",
          },
          {
            model: Sub_Kriteria,
            as: "subkriteria",
          },
        ],
      },
    });

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Data Permission searched Found",
      data: req,
    });
  } catch (error) {
    console.log(error);
  }
};
