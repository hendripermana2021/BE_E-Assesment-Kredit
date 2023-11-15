import db from "../models/index.js";
import { Op } from "sequelize";

const Req = db.tbl_req;
const Cpi = db.tbl_cpi;
const Kriteria = db.tbl_kriteria;
const Sub_Kriteria = db.tbl_subkriteria;
const PegawaiUstadz = db.tbl_pegawai;
const Santri = db.tbl_santri;

export const addReqAndAlternatives = async (req, res) => {
  const {
    student_id,
    created_by,
    status_req,
    date_start,
    time_start,
    date_end,
    time_end,
    cpi_result,
    commented,
    validation,
    validation_by,
  } = req.body;
  const cpi = req.body.kriteria;
  const alternatifKriteriaSub = req.body.kriteria;

  const userID = req.user.userId;

  try {
    const req = await Req.create({
      student_id,
      created_by: userID,
      status_req: 0,
      date_start,
      time_start,
      date_end,
      time_end,
      cpi_result,
      commented,
      validation,
      validation_by,
    });

    const dataReq = await Req.findAll({
      where: { id: req.id },
    });

    const parsedDataProfile = JSON.parse(JSON.stringify(alternatifKriteriaSub));

    const inputCpi = cpi.map((parsedDataProfile) => ({
      id_order: req.id,
      id_kriteria: parsedDataProfile.id_kriteria,
      id_subkriteria: parsedDataProfile.id_subkriteria,
    }));

    const hasil = await Cpi.bulkCreate(inputCpi);

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Adding New Permission",
      data: { dataReq, hasil },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataKriteriaDanSubKriteria = async (req, res) => {
  const user_id = req.user.userId;
  try {
    const req = await Req.findAll({
      attributes: ["id", "student_id", "cpi_result"],
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

export const calculatedROC = async (req, res) => {
  const kriteria = await Kriteria.findAll({});

  const sortfill = kriteria.sort((a, b) => a.scale_priority - b.scale_priority);

  let result = [];
  try {
    for (let i = 1; i <= sortfill.length; i++) {
      for (let j = 1; j <= sortfill.length; j++) {
        if (i <= j) {
          result.push(1 / j);
        } else {
          result.push(0);
        }
      }
      result;
    }

    const separatedArray = [];
    for (let i = 0; i < result.length; i += 6) {
      separatedArray.push(result.slice(i, i + 6));
    }

    // Menjumlahkan setiap subarray dan membagi hasilnya dengan 6
    const sumAndAverage = separatedArray.map(
      (subarray) => subarray.reduce((acc, num) => acc + num, 0) / 6
    );

    for (let i = 0; i < sortfill.length; i++) {
      await Kriteria.update(
        {
          weight_score: sumAndAverage[i],
        },
        {
          where: { id: sortfill[i].id },
        }
      );
    }

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Calculated ROC",
      data: kriteria,
    });
  } catch (error) {
    console.log(error);
  }
};

export const calculatedCPI = async (req, res) => {};
