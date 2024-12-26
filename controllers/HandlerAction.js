import { assignRanking } from "../globalFunction/sortedRank.js";
import db from "../models/index.js";

const Req = db.tbl_req;
const Cpi = db.tbl_cpi;
const Kriteria = db.tbl_kriteria;
const Nasabah = db.tbl_nasabah;
const Sub_Kriteria = db.tbl_subkriteria;
const Calculated = db.tbl_calculated;

export const CalculatedROC = async (req, res) => {
  const kriteria = await Kriteria.findAll({
    include: {
      model: Sub_Kriteria,
      as: "sub_kriteria",
    },
  });

  ///////////////////////////////////////////////////////////////////////////////---> START CODE FOR METHOD ROC
  try {
    const sortfill = kriteria.sort(
      (a, b) => a.scale_priority - b.scale_priority
    );

    let result = [];
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

    console.log("result", result);

    const separatedArray = [];
    for (let i = 0; i < result.length; i += kriteria.length) {
      separatedArray.push(result.slice(i, i + kriteria.length));
    }

    // Menjumlahkan setiap subarray dan membagi hasilnya
    const sumAndAverage = separatedArray.map(
      (subarray) =>
        subarray.reduce((acc, num) => acc + num, 0) / kriteria.length
    );

    console.log("separatedArray :", separatedArray);
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

    const updateKriteria = await Kriteria.findAll({
      include: {
        model: Sub_Kriteria,
        as: "sub_kriteria",
      },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Success Calculated ROC",
      data: {
        rocArray: separatedArray,
        resultArray: sumAndAverage,
        result: updateKriteria,
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

export const calculatedCPIisNull = async (req, res) => {
  const user = req.user;
  try {
    const reqAjuan = await Req.findAll({
      where: {
        id_calculated: null,
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

    console.log(reqAjuan);

    if (reqAjuan == 0) {
      return res.status(404).json({
        code: 404,
        status: true,
        msg: "No data CPI to be calculated",
      });
    }

    const kriteria = await Kriteria.findAll({});

    ///////////////////////////////////////////////////////////////---> START CODE METHOD CPI
    //------> STEP 1
    let normalisasi = [];
    //Step 1 normalisasi Tabel dan Flatten
    for (let i = 0; i < reqAjuan.length; i++) {
      for (let j = 0; j < reqAjuan[i].cpi_data.length; j++) {
        normalisasi.push(reqAjuan[i].cpi_data[j].subkriteria.value);
      }
    }

    //flatten
    const groupSize = normalisasi.length / reqAjuan.length;

    // Mengelompokkan array menjadi subarray berukuran 6
    const groupedArrays = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = normalisasi.slice(i, i + groupSize);
      groupedArrays.push(subarray);
    }
    console.log("getvalue : ", normalisasi);
    console.log("Grouped by Alternatif : ", groupedArrays);

    console.log("normalisasi lenght : ", normalisasi.length);
    console.log("groupsized lenght : ", reqAjuan.length);

    //pencarian MIN :
    const transposedArray = groupedArrays[0].map((_, colIndex) =>
      groupedArrays.map((row) => row[colIndex])
    );
    console.log("Transposed Array : ", transposedArray);

    const minValues = transposedArray.map((row) => Math.min(...row));
    const maxValues = transposedArray.map((row) => Math.max(...row));
    console.log("Pencarian Nilai Min : ", minValues);
    //END

    //------> STEP KE-2, melakukan perkalian dan pembagian
    let minNormalisasi = [];

    for (let i = 0; i < reqAjuan.length; i++) {
      for (let j = 0; j < reqAjuan[i].cpi_data.length; j++) {
        if (reqAjuan[i].cpi_data[j].kriteria.type == 1) {
          let a = groupedArrays[i][j] / maxValues[j];
          minNormalisasi.push(a);
        } else {
          let a = minValues[j] / groupedArrays[i][j];
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

    for (let i = 0; i < reqAjuan.length; i++) {
      for (let j = 0; j < reqAjuan[i].cpi_data.length; j++) {
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

    //Insert CPI RESULTS to DATABASE Permission reqAjuan Table Database

    const calculateId = await Calculated.create({
      created_by: user.userId,
    });

    for (let i = 0; i < reqAjuan.length; i++) {
      await Req.update(
        {
          cpi_result: step4Final[i],
          id_calculated: calculateId.id,
        },
        {
          where: { id: reqAjuan[i].id },
        }
      );
    }

    console.log(step4Final[0]);

    const resultCpi = await Req.findAll({
      include: [
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
        {
          model: Nasabah,
          as: "nasabah",
        },
      ],
    });

    const makeRank = assignRanking(resultCpi);

    console.log("rank", makeRank);

    for (let i = 0; i < resultCpi.length; i++) {
      let newStatus = resultCpi[i].cpi_result > 0.5 ? "Diterima" : "Ditolak";

      await Req.update(
        {
          rank: makeRank[i].rank,
          status_ajuan: newStatus,
        },
        {
          where: { id: makeRank[i].id },
        }
      );
    }

    const finalResultReq = await Req.findAll({
      include: [
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
        {
          model: Nasabah,
          as: "nasabah",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      msg: "Success Calculated CPI",
      data: {
        result: finalResultReq,
        kriteria: kriteria,
        step1: { groupedArrays, minValues, maxValues },
        step2: minNormalisasiTranspose,
        step3: { step3Transpose, sumGroups, maxValue, minValue },
        step4: step4Final,
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

export const calculatedCPIHistory = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const reqAjuan = await Req.findAll({
      where: {
        id_calculated: id,
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

    console.log(reqAjuan);

    if (reqAjuan == 0) {
      return res.status(404).json({
        code: 404,
        status: true,
        msg: "No data CPI to be calculated",
      });
    }

    const kriteria = await Kriteria.findAll({});

    ///////////////////////////////////////////////////////////////---> START CODE METHOD CPI
    //------> STEP 1
    let normalisasi = [];
    //Step 1 normalisasi Tabel dan Flatten
    for (let i = 0; i < reqAjuan.length; i++) {
      for (let j = 0; j < reqAjuan[i].cpi_data.length; j++) {
        normalisasi.push(reqAjuan[i].cpi_data[j].subkriteria.value);
      }
    }

    //flatten
    const groupSize = normalisasi.length / reqAjuan.length;

    // Mengelompokkan array menjadi subarray berukuran 6
    const groupedArrays = [];
    for (let i = 0; i < normalisasi.length; i += groupSize) {
      const subarray = normalisasi.slice(i, i + groupSize);
      groupedArrays.push(subarray);
    }
    console.log("getvalue : ", normalisasi);
    console.log("Grouped by Alternatif : ", groupedArrays);

    console.log("normalisasi lenght : ", normalisasi.length);
    console.log("groupsized lenght : ", reqAjuan.length);

    //pencarian MIN :
    const transposedArray = groupedArrays[0].map((_, colIndex) =>
      groupedArrays.map((row) => row[colIndex])
    );
    console.log("Transposed Array : ", transposedArray);

    const minValues = transposedArray.map((row) => Math.min(...row));
    const maxValues = transposedArray.map((row) => Math.max(...row));
    console.log("Pencarian Nilai Min : ", minValues);
    //END

    //------> STEP KE-2, melakukan perkalian dan pembagian
    let minNormalisasi = [];

    for (let i = 0; i < reqAjuan.length; i++) {
      for (let j = 0; j < reqAjuan[i].cpi_data.length; j++) {
        if (reqAjuan[i].cpi_data[j].kriteria.type == 1) {
          let a = groupedArrays[i][j] / maxValues[j];
          minNormalisasi.push(a);
        } else {
          let a = minValues[j] / groupedArrays[i][j];
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

    for (let i = 0; i < reqAjuan.length; i++) {
      for (let j = 0; j < reqAjuan[i].cpi_data.length; j++) {
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

    //Insert CPI RESULTS to DATABASE Permission reqAjuan Table Database

    const resultCpi = await Req.findAll({
      include: [
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
        {
          model: Nasabah,
          as: "nasabah",
        },
      ],
    });

    const makeRank = assignRanking(resultCpi);

    console.log("rank", makeRank);

    for (let i = 0; i < resultCpi.length; i++) {
      let newStatus = resultCpi[i].cpi_result > 0.5 ? "Diterima" : "Ditolak";

      await Req.update(
        {
          rank: makeRank[i].rank,
          status_ajuan: newStatus,
        },
        {
          where: { id: makeRank[i].id },
        }
      );
    }

    const finalResultReq = await Req.findAll({
      include: [
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
        {
          model: Nasabah,
          as: "nasabah",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      msg: "Success Calculated CPI",
      data: {
        result: finalResultReq,
        kriteria: kriteria,
        step1: { groupedArrays, minValues, maxValues },
        step2: minNormalisasiTranspose,
        step3: { step3Transpose, sumGroups, maxValue, minValue },
        step4: step4Final,
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

export const calculatedCPIByIdCalculated = async (req, res) => {
  const user_id = req.user.userId;
  const { id } = req.params;
  try {
    const req = await Req.findAll({
      where: {
        created_by: user_id,
        id_calculated: id,
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

    if (req.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Nothing Data CPI Empty for Calculated",
      });
    }

    const kriteria = await Kriteria.findAll({});

    ///////////////////////////////////////////////////////////////---> START CODE METHOD CPI
    //------> STEP 1
    let normalisasi = [];
    //Step 1 normalisasi Tabel dan Flatten
    for (let i = 0; i < req.length; i++) {
      for (let j = 0; j < req[i].cpi_data.length; j++) {
        normalisasi.push(req[i].cpi_data[j].subkriteria.value);
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
        if (req[i].cpi_data[j].kriteria.type == 1) {
          let a = (groupedArrays[i][j] / minValues[j]) * 100;
          minNormalisasi.push(a);
        } else {
          let a = (minValues[j] / groupedArrays[i][j]) * 100;
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

    return res.status(200).json({
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
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "An error occurred during the update.",
      error: error.message,
    });
  }
};

export const getReqCpiNull = async (req, res) => {
  const user_id = req.user.userId;

  try {
    const req = await Req.findAll({
      where: {
        created_by: user_id,
        id_calculated: 0,
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

    if (req.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Nothing Data CPI Empty for Calculated",
      });
    }

    return res.status(200).json({
      status: true,
      msg: "Success get data CPI null by created",
      data: req,
    });
  } catch (error) {}
};
