import db from "../models/index.js";
import multer from "multer";
import fs from "fs/promises";
import path from "path";

const Nasabah = db.tbl_nasabah;
const Document = db.tbl_document;
const Users = db.tbl_users;
const storage = multer.memoryStorage();

export const getDataNasabah = async (req, res) => {
  try {
    const user = req.user;
    let nasabah;

    if (user.role_id == 1) {
      nasabah = await Nasabah.findAll({
        include: {
          model: Document,
          as: "document",
        },
      });
    } else {
      nasabah = await Nasabah.findAll({
        where: {
          id_user: user.id,
        },
        include: {
          model: Document,
          as: "document",
        },
      });
    }

    if (user == "") {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    const sortfill = nasabah.sort((a, b) =>
      a.name_nasabah.localeCompare(b.name_nasabah)
    );

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
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

export const getDataNasabahById = async (req, res) => {
  const { id } = req.params;
  try {
    const nasabah = await Nasabah.findOne({
      where: { id: id },
    });
    if (!nasabah) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: nasabah,
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

export const RegisterNasabah = async (req, res) => {
  const {
    name_nasabah,
    gender,
    fathername,
    mothername,
    marital_status,
    no_hp,
    place_of_birth,
    birthday,
    address,
    nik,
    job_title,
    monthly_income,
    employment_status,
    work_address,
    long_work_at_company,
  } = req.body;

  try {
    const nasabah = await Nasabah.create({
      name_nasabah,
      gender,
      fathername,
      mothername,
      marital_status,
      status: "Aktif", // Assuming 'status' is active or something similar
      no_hp,
      place_of_birth,
      birthday,
      address,
      image: `http://localhost:8000/image/${req.file.filename}`, // Handling the image upload
      nik,
      job_title,
      monthly_income,
      employment_status,
      work_address,
      long_work_at_company,
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Register Nasabah Successfully",
      data: nasabah,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "An error occurred during registration.",
      error: error.message,
    });
  }
};

export const deleteNasabah = async (req, res) => {
  const { id } = req.params;
  const nasabah = await Nasabah.findOne({
    where: { id },
  });

  if (!nasabah) {
    return res.status(404).json({
      code: 404,
      status: false,
      msg: "Data Santri doesn't exist or has been deleted!",
    });
  }

  let baseUrl = "http://localhost:8000";

  let relativeUrl = dataBefore.image.replace(baseUrl, "public");
  console.log(relativeUrl);

  if (nasabah.image) {
    await fs.unlink(relativeUrl);
  }

  await Nasabah.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Nasabah Successfully",
    data: nasabah,
  });
};

export const updateDataNasabah = async (req, res) => {
  const { id } = req.params;
  const {
    name_nasabah,
    gender,
    fathername,
    mothername,
    password,
    marital_status,
    no_hp,
    place_of_birth,
    birthday,
    address,
    nik,
    job_title,
    monthly_income,
    employment_status,
    work_address,
    long_work_at_company,
  } = req.body;

  try {
    // Fetch the existing data for the nasabah
    const data_before = await Nasabah.findOne({
      where: { id },
    });

    if (!data_before) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data Nasabah doesn't exist or has been deleted!",
      });
    }

    // Remove the previous image if exists
    let baseUrl = "http://localhost:8000";
    let relativeUrl = data_before.image.replace(baseUrl, "public");
    console.log(relativeUrl);

    if (data_before.image) {
      await fs.unlink(relativeUrl);
    }

    // Update the Nasabah data
    const nasabah = await Nasabah.update(
      {
        name_nasabah,
        gender,
        fathername,
        mothername,
        password,
        marital_status,
        no_hp,
        place_of_birth,
        birthday,
        address,
        nik,
        job_title,
        monthly_income,
        employment_status,
        work_address,
        long_work_at_company,
        image: req.file
          ? `http://localhost:8000/image/${req.file.filename}`
          : data_before.image, // Handle image update if provided
      },
      {
        where: { id },
      }
    );

    // Fetch updated data to return
    const data_update = await Nasabah.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Data Nasabah Successfully Updated",
      data: { data_before, data_update },
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

export const imageAppeared = async (req, res) => {
  try {
    const imageName = req.params;
    const imagePath = path.join(__dirname, "../image", imageName);

    // Send the image as a response
    return res.status(200).sendFile(imagePath);
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
