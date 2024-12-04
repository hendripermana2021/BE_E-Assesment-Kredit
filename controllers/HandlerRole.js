import db from "../models/index.js";
import { Op } from "sequelize";

const Role = db.tbl_role;
export const getDataRole = async (req, res) => {
  try {
    const role = await Role.findAll({});
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: role,
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

export const getDataRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findAll({
      where: { id: id },
    });
    if (role == "") {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Role Doesn't Exist",
      });
    }
    return (200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: role,
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

export const getRoleBy = async (req, res) => {
  try {
    const { search } = req.params;
    let role = await Role.findAll({
      where: {
        [Op.or]: [{ role_name: { [Op.like]: `%` + search + `%` } }],
      },
    });
    if (role == "") {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Role Doesn't Existing",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data Role you searched Found",
      data: role,
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

export const createRole = async (req, res) => {
  const { role_name } = req.body;

  try {
    const checkRole = Role.findAll({
      where: {
        role_name: role_name,
      },
    });

    if (checkRole == 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Santri doesn't exist or has been deleted!",
      });
    }

    const role = await Role.create({
      role_name,
    });

    return (200).json({
      code: 200,
      status: true,
      msg: "Create Data Role berhasil",
      data: role_name,
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

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  const dataBefore = await Role.findOne({
    where: { id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(404).json({
      code: 404,
      status: false,
      msg: "Data Role doesn't exist or has been deleted!",
    });
  }

  await Role.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Role Successfully",
    data: dataBefore,
  });
};

export const updateRole = async (req, res) => {
  const { id } = req.params;
  try {
    const dataBefore = await Role.findOne({
      where: { id: id },
    });
    const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

    if (!parsedDataProfile) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Role doesn't exist or has been deleted!",
      });
    }

    const { role_name } = req.body;

    const role = await Role.update(
      { role_name },
      {
        where: { id: id },
      }
    );

    const dataUpdate = await Role.findOne({
      where: { id: id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Role Success Updated",
      data_before: { dataBefore, dataUpdate },
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
