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

export const createKriteriaAndCalculatedROC = async (req, res) => {
  const kriteria = await Kriteria.findAll({});

  ///////////////////////////////////////////////////////////////////////////////---> START CODE FOR METHOD ROC
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
    ///////////////////////////////////////////////////////////////////////////////---> END CODE METHOD ROC

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

export const calculatedCPI = async (req, res) => {
  const user_id = req.user.userId;
  try {
    const req = await Req.findAll({
      attributes: ["id", "student_id", "cpi_result"],
      where: {
        created_by: user_id,
        cpi_result: null,
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

    if (req == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Don't Have Data for Calculated",
      });
    }

    const kriteria = await Kriteria.findAll({});

    ///////////////////////////////////////////////////////////////---> START CODE METHOD CPI
    //------> STEP 1
    let normalisasi = [];
    //Step 1 normalisasi Tabel dan Flatten
    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        normalisasi.push(req[i].cpi_data[j].subkriteria[0].value);
      }
    }

    //flatten
    const groupSize = normalisasi.length / req.length;

    // Mengelompokkan array menjadi subarray berukuran 6
    const groupedArrays = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = normalisasi.slice(i, i + groupSize);
      groupedArrays.push(subarray);
    }
    console.log("getvalue : ", normalisasi);
    console.log("Grouped by Alternatif : ", groupedArrays);

    console.log("normalisasi lenght : ", normalisasi.length);
    console.log("groupsized lenght : ", req.length);

    //pencarian MIN :
    const transposedArray = groupedArrays[0].map((_, colIndex) =>
      groupedArrays.map((row) => row[colIndex])
    );
    console.log("Transposed Array : ", transposedArray);

    const minValues = transposedArray.map((row) => Math.min(...row));
    console.log("Pencarian Nilai Min : ", minValues);
    //END

    //------> STEP KE-2, melakukan perkalian dan pembagian
    let minNormalisasi = [];

    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        if (req[i].cpi_data[j].kriteria[0].type == 1) {
          let a = (groupedArrays[i][j] / minValues[j]) * 1;
          minNormalisasi.push(a);
        } else {
          let a = (minValues[j] / groupedArrays[i][j]) * 1;
          minNormalisasi.push(a);
        }
      }
    }
    const minNormalisasiTranspose = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = minNormalisasi.slice(i, i + groupSize);
      minNormalisasiTranspose.push(subarray);
    }
    console.log("Hasil Step 2 :", minNormalisasi);
    console.log("Transpose Step 2 :", minNormalisasiTranspose);
    //END

    //------> STEP KE-3, BOBOT x MATRIKS TERNORMALISASI
    let step3 = [];

    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        let b = minNormalisasiTranspose[i][j] * kriteria[j].weight_score;
        step3.push(b);
      }
    }

    const step3Transpose = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = step3.slice(i, i + groupSize);
      step3Transpose.push(subarray);
    }

    const sumGroups = step3Transpose.map((group) =>
      group.reduce((acc, value) => acc + value, 0)
    );

    console.log("Hasil Step 3 :", step3);
    console.log("Transpose Step 3 :", step3Transpose);
    console.log("Sum Array Step 3 :", sumGroups);

    // Find maximum value
    const maxValue = Math.max(...sumGroups);

    // Find minimum value
    const minValue = Math.min(...sumGroups);
    console.log(`Max Value: ${maxValue}
    Min Value: ${minValue}`);
    //END

    //------> STEP 4 FINAL RESULTS
    let step4Final = [];
    for (let i = 0; i < sumGroups.length; i++) {
      let z = (sumGroups[i] - minValue) / (maxValue - minValue);
      step4Final.push(z);
    }
    console.log("Final Results CPI dan ROC : ", step4Final);

    ///////////////////////////////////////////////////////////////////////////////---> END CODE METHOD CPI

    //Insert CPI RESULTS to DATABASE Permission Req Table Database
    for (let i = 0; i < req.length; i++) {
      await Req.update(
        {
          cpi_result: step4Final[i],
        },
        {
          where: { id: req[i].id },
        }
      );
    }
    console.log(step4Final[0]);

    res.status(200).json({
      status: true,
      msg: "Success Calculated ROC",
      data: {
        req,
        step1: { groupedArrays, minValues },
        step2: minNormalisasiTranspose,
        step3: { step3Transpose, sumGroups, maxValue, minValue },
        step4: step4Final,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
