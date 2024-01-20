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
      data: role,
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
    const kriteria = await Kriteria.create({
      scale_priority,
      name_kriteria,
      weight_score,
      type,
    });

    const bulkCreateKriteriaDanSub = subKriteria.map((data) => ({
      id_kriteria: kriteria.id,
      name_sub: data.name_sub,
      value: data.value,
    }));

    const addSubKriteria = await SubKriteria.bulkCreate(
      bulkCreateKriteriaDanSub
    );

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
  const { scale_priority, name_kriteria, weight_score, type } = req.body;
  const fromBodySubKriteria = req.body.subkriteria;

  try {
    const dataBeforeUpdate = await Kriteria.findOne({
      where: { id: id },
    });

    const getDataSubKriteria = await SubKriteria.findAll({
      where: {
        id_kriteria: id,
      },
    });

    const parsedDataKriteria = JSON.parse(JSON.stringify(dataBeforeUpdate));

    if (!parsedDataKriteria) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Kriteria doesn't exist or has been deleted!",
      });
    }

    const kriteria = await Kriteria.update(
      { scale_priority, name_kriteria, weight_score, type },
      {
        where: { id: id },
      }
    );
    const dataKriteriaUpdated = await Kriteria.findOne({
      where: { id: id },
    });

    //BULK UPDATE WITH FOR
    for (let i = 0; i < fromBodySubKriteria.length; i++) {
      await SubKriteria.update(
        {
          name_sub: fromBodySubKriteria[i].name_sub,
          value: fromBodySubKriteria[i].value,
        },
        {
          where: { id: fromBodySubKriteria[i].id },
        }
      );
    }

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Kriteria dan Sub-Kriteria Success Updated",
      data: { dataKriteriaUpdated, fromBodySubKriteria },
    });
  } catch (error) {
    console.log(error);
  }
};
