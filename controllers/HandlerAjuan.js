import db from "../models/index.js";
import { Op } from "sequelize";

const Req = db.tbl_req;
const Nasabah = db.tbl_santri;
const Users = db.tbl_pegawai;
const Cpi = db.tbl_cpi;
const Kriteria = db.tbl_kriteria;
const Sub_Kriteria = db.tbl_subkriteria;
const Notif = db.tbl_notification;

export const getDataAjuanOnlyAccepted = async (req, res) => {
  try {
    const req = await Req.findAll({
      include: [
        {
          model: Nasabah,
          as: "nasabah",
        },
        {
          model: Users,
          as: "pengaju",
        },
        {
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
      ],
    });

    if (req === "") {
      return res.status(404).json({
        code: 404,
        status: true,
        msg: "Data not found",
      });
    }

    const result = [];
    for (let i = 0; i < req.length; i++) {
      if (req[i].status_ajuan != 1) result.push(req[i]);
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Ajuan",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "An error occurred during the update.",
      error: error.message,
    });
  }
};

export const getDataAjuanAll = async (req, res) => {
  const user = req.user;
  try {
    let req;
    if (user.role_id == 1) {
      req = await Req.findAll({
        include: [
          {
            model: Nasabah,
            as: "nasabah",
          },
          {
            model: Users,
            as: "pengaju",
          },
          {
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
        ],
      });
    } else {
      req = await Req.findAll({
        where: { created_by: user.userId },
        include: [
          {
            model: Nasabah,
            as: "nasabah",
          },
          {
            model: Users,
            as: "pengaju",
          },
          {
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
        ],
      });
    }

    if (req.length == 0) {
      return res.status(404).json({
        code: 404,
        status: true,
        msg: "Data Req not exist",
      });
    }

    const sortfill = req.sort(
      (b, a) => a.permission_status - b.permission_status
    );

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission",
      data: sortfill,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "An error occurred during the update.",
      error: error.message,
    });
  }
};

export const getDataAjuanById = async (req, res) => {
  const { id } = req.params;
  try {
    const req = await Req.findOne({
      where: { id: id },
      include: [
        {
          model: Nasabah,
          as: "nasabah",
        },
        {
          model: Users,
          as: "pengaju",
        },
        {
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
      ],
    });
    if (req == "") {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Permission Doesn't Exist",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: req,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "An error occurred during the update.",
      error: error.message,
    });
  }
};

export const getDataAjuanByUserId = async (req, res) => {
  const user = req.user;

  try {
    let req;
    if (user.role_id == 1) {
      req = await Req.findAll({
        where: { id_calculated: null },
        order: [["id", "DESC"]],
        include: [
          {
            model: Nasabah,
            as: "nasabah",
          },
          {
            model: Users,
            as: "pengaju",
          },
          {
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
        ],
      });
    } else {
      req = await Req.findAll({
        where: {
          created_by: user.userId,
          id_calculated: null,
        },
        order: [["id", "DESC"]],
        include: [
          {
            model: Nasabah,
            as: "nasabah",
          },
          {
            model: Users,
            as: "pengaju",
          },
          {
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
        ],
      });
    }

    if (req == "") {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Ajuan Doesn't Exist",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Data Ajuan searched Found",
      data: req,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "An error occurred during the update.",
      error: error.message,
    });
  }
};

export const addAjuan = async (req, res) => {
  const { id_nasabah, jlh_dana, commented, purpose } = req.body;
  const cpi = req.body.kriteria;

  const user = req.user;

  try {
    //Check Request Existed
    const reqCheck = await Req.findOne({
      where: {
        id_nasabah: id_nasabah,
        status_ajuan: "Aktif",
      },
    });

    if (reqCheck.length > 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Ajuan is still existed, and processing by system.",
      });
    }
    //END CHECK

    //MAKE REQUEST
    const req = await Req.create({
      id_nasabah,
      created_by: user.userId,
      cpi_result: "",
      id_calculated: null,
      commented,
      purpose_req: purpose,
      jlh_dana,
      status_ajuan: "Aktif",
    });

    //END REQUEST

    //GET DATA FOR ASSOCIATED TO ANOTHER TABLE
    const nasabah = await Nasabah.findOne({
      where: { id: req.id_nasabah },
    });

    const dataReq = await Req.findAll({
      where: { id: req.id },
    });

    await Notif.create({
      user_id: user.userId,
      message: `Permission created by ${user.name_user} for ${nasabah.name_nasabah}`,
      isRead: 0,
    });
    //END

    const inputCpi = cpi.map((result) => ({
      id_order: req.id,
      id_kriteria: result.id_kriteria,
      id_subkriteria: result.id_subkriteria,
    }));

    const hasil = await Cpi.bulkCreate(inputCpi);

    return res.status(200).json({
      code: 200,
      status: true,
      msg: `Ajuan created by ${user.name_user} for ${nasabah.name_nasabah}`,
      data: { dataReq, nasabah, hasil },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "An error occurred during the update.",
      error: error.message,
    });
  }
};

export const updateAjuan = async (req, res) => {
  const { id } = req.params;
  const { jlh_dana, commented, purpose } = req.body;
  const fieldKriteria = req.body.kriteria;

  try {
    const reqBefore = await Req.findOne({
      where: { id: id },
      include: [
        {
          model: Nasabah,
          as: "nasabah",
        },
        {
          model: Users,
          as: "pengaju",
        },
        {
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
      ],
    });

    const dataCpi = await Cpi.findAll({
      where: { id_order: id },
    });

    if (!reqBefore) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data CPI doesn't exist or has been deleted!",
      });
    }

    await Req.update(
      { jlh_dana, purpose_req: purpose, commented },
      {
        where: { id },
      }
    );

    for (let i = 0; i < fieldKriteria.length; i++) {
      let cpiData = dataCpi.find(
        (cpi) => cpi.id_kriteria === fieldKriteria[i].id_kriteria
      );
      if (!cpiData) {
        cpiData = await Cpi.create({
          id_kriteria: fieldKriteria[i].id_kriteria,
          id_subkriteria: fieldKriteria[i].id_subkriteria,
          id_order: id,
        });
      } else {
        await Cpi.update(
          {
            id_subkriteria: fieldKriteria[i].id_subkriteria,
          },
          {
            where: { id: dataCpi[i].id },
          }
        );
      }
    }

    const dataPermissionUpdated = await Req.findOne({
      where: { id: id },
      include: [
        {
          model: Nasabah,
          as: "nasabah",
        },
        {
          model: Users,
          as: "pengaju",
        },
        {
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
      ],
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Data Ajuan Success Updated",
      data: {
        "Data Sebelum": reqBefore,
        "Sesudah Diubah": dataPermissionUpdated,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "An error occurred during the update.",
      error: error.message,
    });
  }
};

export const deleteAjuan = async (req, res) => {
  const { id } = req.params;

  try {
    const req = await Req.findOne({
      where: { id },
    });

    if (!req) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Ajuan doesn't exist or has been deleted!",
      });
    }

    await req.destroy({
      where: { id },
    });

    await Cpi.destroy({
      where: { id_order: id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Ajuan Successfully",
      data: req,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "An error occurred during the update.",
      error: error.message,
    });
  }
};
