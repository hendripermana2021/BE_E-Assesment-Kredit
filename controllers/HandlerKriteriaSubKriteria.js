import db from "../models/index.js";

const Kriteria = db.tbl_kriteria;
const SubKriteria = db.tbl_subkriteria;
export const getDataKriteria = async (req, res) => {
  try {
    const kriteria = await Kriteria.findAll({
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: kriteria,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataKriteriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const kriteria = await Kriteria.findAll({
      where: { id: id },
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });
    if (kriteria == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Kriteria Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: kriteria,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createKriteriaDanSub = async (req, res) => {
  const { scale_priority, name_kriteria, weight_score, type } = req.body;
  const subKriteria = req.body.subkriteria;

  try {
    const getkriteria = await Kriteria.findAll({});

    for (let i = 0; i < getkriteria.length; i++) {
      if (scale_priority == getkriteria[i].scale_priority) {
        res.status(400).json({
          code: 400,
          status: false,
          msg: "Scale Priority is Duplicate, please change",
        });
      }
    }

    const kriteriaCreate = await Kriteria.create({
      scale_priority,
      name_kriteria,
      weight_score,
      type,
    });

    const bulkCreateKriteriaDanSub = subKriteria.map((data) => ({
      id_kriteria: kriteriaCreate.id,
      name_sub: data.name_sub,
      value: data.value,
    }));

    const addSubKriteria = await SubKriteria.bulkCreate(
      bulkCreateKriteriaDanSub
    );

    //Auto ROC for Kriteria
    const kriteria = await Kriteria.findAll({});
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

    const updateKriteria = await Kriteria.findAll({});
    //END

    res.status(200).json({
      code: 200,
      status: true,
      msg: "Create Data Kriteria and Sub Kriteria berhasil",
      data: { kriteria, addSubKriteria },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteKriteriaDanSub = async (req, res) => {
  const { id } = req.params;

  try {
    const dataBefore = await Kriteria.findOne({
      where: { id },
    });

    if (!dataBefore) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Role doesn't exist or has been deleted!",
      });
    }

    await Kriteria.destroy({
      where: { id },
    });

    await SubKriteria.destroy({
      where: { id_kriteria: dataBefore.id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete Data Role Successfully",
      data: dataBefore,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateKriteriaDanSub = async (req, res) => {
  const { id } = req.params;
  const { scale_priority, name_kriteria, type } = req.body;
  const fromBodySubKriteria = req.body.subkriteria;

  try {
    const dataBeforeUpdate = await Kriteria.findOne({
      where: { id: id },
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });

    const getDataSubKriteria = await SubKriteria.findAll({
      where: {
        id_kriteria: id,
      },
    });

    if (dataBeforeUpdate == 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Kriteria doesn't exist or has been deleted!",
      });
    }

    const kriteria = await Kriteria.update(
      { scale_priority, name_kriteria, type },
      {
        where: { id: id },
      }
    );

    //BULK UPDATE WITH FOR
    for (let i = 0; i < fromBodySubKriteria.length; i++) {
      await SubKriteria.update(
        {
          name_sub: fromBodySubKriteria[i].name_sub,
          value: fromBodySubKriteria[i].value,
        },
        {
          where: { id: getDataSubKriteria[i].id },
        }
      );
    }

    const dataUpdated = await Kriteria.findOne({
      where: { id: id },
      include: {
        model: SubKriteria,
        as: "sub_kriteria",
      },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Kriteria dan Sub-Kriteria Success Updated",
      data: {
        "Data Sebelum": dataBeforeUpdate,
        "Sesudah Diubah": dataUpdated,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
