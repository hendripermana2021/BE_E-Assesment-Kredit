import db from "../models/index.js";
import { Op } from "sequelize";

const Req = db.tbl_req;
const Nasabah = db.tbl_nasabah;
const Users = db.tbl_users;
const Cpi = db.tbl_cpi;
const Kriteria = db.tbl_kriteria;
const Sub_Kriteria = db.tbl_subkriteria;
const Notif = db.tbl_notification;
const Document_ajuan = db.tbl_document_ajuan;
const Document = db.tbl_document;
const Calculated = db.tbl_calculated;

export const getDataAjuanOnlyAccepted = async (req, res) => {
  try {
    const req = await Req.findAll({
      where: "Selesai",
      include: [
        {
          model: Nasabah,
          as: "nasabah",
          include: {
            model: Document,
            as: "document",
          },
        },
        {
          model: Document_ajuan,
          as: "document_ajuan",
        },
        {
          model: Users,
          as: "petugas_pengaju",
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

    if (req.length == 0) {
      return res.status(404).json({
        code: 404,
        status: true,
        msg: "Data not found",
      });
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
            include: {
              model: Document,
              as: "document",
            },
          },
          {
            model: Document_ajuan,
            as: "document_ajuan",
          },
          {
            model: Users,
            as: "petugas_pengaju",
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
            include: {
              model: Document,
              as: "document",
            },
          },
          {
            model: Users,
            as: "petugas_pengaju",
          },
          {
            model: Document_ajuan,
            as: "document_ajuan",
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

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission",
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

export const getDataAjuanHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const req = await Req.findAll({
      where: {
        id_calculated: id,
      },
      include: [
        {
          model: Calculated,
          as: "history_calculated",
        },
        {
          model: Nasabah,
          as: "nasabah",
          include: {
            model: Document,
            as: "document",
          },
        },
        {
          model: Document_ajuan,
          as: "document_ajuan",
        },
        {
          model: Users,
          as: "petugas_pengaju",
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

    if (req.length == 0) {
      return res.status(404).json({
        code: 404,
        status: true,
        msg: "Data is on generated not existed",
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission",
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

export const getDataAjuanNullGenerated = async (req, res) => {
  const user = req.user;
  try {
    let req;
    if (user.role_id == 1) {
      req = await Req.findAll({
        where: {
          id_calculated: null,
        },
        include: [
          {
            model: Nasabah,
            as: "nasabah",
            include: {
              model: Document,
              as: "document",
            },
          },
          {
            model: Document_ajuan,
            as: "document_ajuan",
          },
          {
            model: Users,
            as: "petugas_pengaju",
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
        where: { created_by: user.userId, id_calculated: null },
        include: [
          {
            model: Nasabah,
            as: "nasabah",
            include: {
              model: Document,
              as: "document",
            },
          },
          {
            model: Users,
            as: "petugas_pengaju",
          },
          {
            model: Document_ajuan,
            as: "document_ajuan",
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

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "All Data Permission",
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

export const getDataAjuanById = async (req, res) => {
  const { id } = req.params;
  try {
    const req = await Req.findOne({
      where: { id: id },
      include: [
        {
          model: Nasabah,
          as: "nasabah",
          include: {
            model: Document,
            as: "document",
          },
        },
        {
          model: Users,
          as: "petugas_pengaju",
        },
        {
          model: Document_ajuan,
          as: "document_ajuan",
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

export const getDataAjuanHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const req = await Req.findOne({
      where: { id_calculated: id },
      include: [
        {
          model: Nasabah,
          as: "nasabah",
          include: {
            model: Document,
            as: "document",
          },
        },
        {
          model: Users,
          as: "petugas_pengaju",
        },
        {
          model: Document_ajuan,
          as: "document_ajuan",
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
            include: {
              model: Document,
              as: "document",
            },
          },
          {
            model: Users,
            as: "petugas_pengaju",
          },
          {
            model: Document_ajuan,
            as: "document_ajuan",
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
            include: {
              model: Document,
              as: "document",
            },
          },
          {
            model: Users,
            as: "petugas_pengaju",
          },
          {
            model: Document_ajuan,
            as: "document_ajuan",
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
  const document = req.body.document;

  const user = req.user;

  try {
    //Check Request Existed
    const reqCheck = await Req.findOne({
      where: {
        id_nasabah: id_nasabah,
        status_ajuan: "Aktif",
      },
    });

    if (reqCheck) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Ajuan is still existed, and processing by system.",
      });
    }
    //END CHECK

    //MAKE REQUEST
    const req = await Req.create({
      id_nasabah,
      created_by: user.userId,
      cpi_result: 0,
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
      message: `Permission created by ${user.name_user} for ${
        nasabah == null || undefined
          ? "Nasabah belum dibuat"
          : nasabah.name_nasabah
      }`,
      isRead: 0,
    });
    //END

    const inputCpi = cpi.map((result) => ({
      id_order: req.id,
      id_kriteria: result.id_kriteria,
      id_subkriteria: result.id_subKriteria,
    }));

    if (document !== "") {
      const mapAllDocument = document.map((result) => ({
        id_req: req.id,
        name_document: result.name_document,
        file: result.file,
      }));

      await Document_ajuan.bulkCreate(mapAllDocument);
    }

    await Cpi.bulkCreate(inputCpi);

    const resultRequestNew = await Req.findOne({
      where: {
        id: req.id,
      },
      include: [
        {
          model: Nasabah,
          as: "nasabah",
          include: {
            model: Document,
            as: "document",
          },
        },
        {
          model: Document_ajuan,
          as: "document_ajuan",
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

    return res.status(201).json({
      code: 201,
      status: true,
      msg: `Ajuan has been created by id ${
        req.created_by
      } successfully for created ajuan to ${
        nasabah == null || undefined
          ? "Nasabah belum dibuat"
          : nasabah.name_nasabah
      }`,
      data: resultRequestNew,
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
  const { jlh_dana, commented, purpose, id_nasabah } = req.body;
  const kriteria = req.body.kriteria;
  const document = req.body.document;

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
          as: "petugas_pengaju",
        },
        {
          model: Document_ajuan,
          as: "document_ajuan",
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
    const dataDocumentAjuan = await Document_ajuan.findAll({
      where: { id_req: id },
    });

    if (!reqBefore) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data CPI doesn't exist or has been deleted!",
      });
    }

    await Req.update(
      { jlh_dana, purpose_req: purpose, commented, id_nasabah },
      {
        where: { id },
      }
    );

    for (let i = 0; i < kriteria.length; i++) {
      let cpiData = dataCpi.find(
        (cpi) => cpi.id_kriteria === kriteria[i].id_kriteria
      );
      await Cpi.update(
        {
          id_subkriteria: kriteria[i].id_subkriteria,
        },
        {
          where: { id: dataCpi[i].id },
        }
      );
    }

    if (document != "") {
      for (let i = 0; i < document.length; i++) {
        await Document_ajuan.update(
          {
            name_document: document[i].name_document,
            file: document[i].file,
          },
          {
            where: { id_req: dataDocumentAjuan[i].id },
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
          as: "petugas_pengaju",
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
