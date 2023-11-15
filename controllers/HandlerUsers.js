import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Pegawai = db.tbl_pegawai;

export const handleGetRoot = async (req, res) => {
  res.status(200).json({
    code: 200,
    status: "OK",
    msg: "E-Permission Status Activated",
  });
};

export const whoAmI = async (req, res) => {
  try {
    const currentUser = req.user;
    res.status(200).json({
      code: 200,
      status: true,
      msg: "This data Users Login Now",
      data: currentUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const LoginPegawai = async (req, res) => {
  try {
    const user = await Pegawai.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Email tidak ditemukan",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Password salah",
      });
    }

    const { id, name_pegawai, sex, email, role_id } = user; // Destructuring assignment untuk menyederhanakan kode

    const accessToken = jwt.sign(
      { id, name_pegawai, sex, email, role_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id, name_pegawai, sex, email, role_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Pegawai.update(
      { refreshtoken: refreshToken, accesstoken: accessToken },
      { where: { id: user.id } } // Menggunakan user.id langsung tanpa indexing
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true, // Menambahkan opsi keamanan
      sameSite: "Lax", // Menambahkan opsi SameSite
    });

    res.status(200).json({
      code: 200,
      msg: "Login Berhasil",
      Token: accessToken,
    });
  } catch (error) {
    console.error("Gagal System:", error); // Menampilkan pesan kesalahan yang lebih informatif
    res.status(500).json({
      code: 500,
      status: false,
      msg: "Gagal System",
    });
  }
};

export const getEmailPegawai = async (req, res) => {
  try {
    const pegawai = await Pegawai.findOne({
      where: {
        email: req.body.email,
      },
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: pegawai,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(200).json({
      code: 200,
      status: false,
      msg: "User Has Been Log Out",
    });
  }
  const user = await Pegawai.findOne({
    where: {
      refreshtoken: refreshToken,
    },
  });
  if (!user) {
    return res.status(200).json({
      code: 200,
      status: false,
      msg: "User Not Found",
    });
  }
  const userId = user.id;
  await Pegawai.update(
    { refreshtoken: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200).json({
    code: 200,
    status: true,
    msg: "You Logout Now",
  });
};

export const deletePegawai = async (req, res) => {
  const { id } = req.params;
  const dataBefore = await Pegawai.findOne({
    where: { id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Users Account doesn't exist or has been deleted!",
    });
  }

  await Pegawai.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Pegawai Successfully",
    data: dataBefore,
  });
};

export const RegisterPegawai = async (req, res) => {
  const { name_pegawai, sex, email, password, role_id } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const pegawai_new = await Pegawai.create({
      name_pegawai,
      sex,
      email,
      password: hashPassword,
      role_id,
    });
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Register Data Pegawai berhasil",
      data: pegawai_new,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPegawai = async (req, res) => {
  try {
    const pegawai = await Pegawai.findAll({});
    res.status(200).json({
      code: 200,
      status: true,
      msg: "This Data All Pegawai",
      data: pegawai,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPegawaiId = async (req, res) => {
  const { id } = req.params;
  try {
    const pegawai = await Pegawai.findAll({
      where: { id: id },
    });
    if (pegawai == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: pegawai,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateDataPegawai = async (req, res) => {
  const { id } = req.params;
  const dataBeforeDelete = await Pegawai.findOne({
    where: { id: id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

  if (!parsedDataProfile) {
    return res.status(400).json({
      code: 400,
      status: false,
      msg: "Users doesn't exist or has been deleted!",
    });
  }

  const { name_pegawai, sex, email, password, role_id } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const user = await Pegawai.update(
      {
        name_pegawai,
        sex,
        email,
        password: hashPassword,
        role_id,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Users Success Updated",
      data_before: dataBeforeDelete,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataPegawaiBy = async (req, res) => {
  try {
    const { search } = req.params;
    let pegawai = await Pegawai.findAll({
      where: {
        [Op.or]: [{ name_pegawai: { [Op.like]: `%` + search + `%` } }],
      },
    });
    if (pegawai == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Pegawai Doesn't Existing",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data pegawai you searched Found",
      data: pegawai,
    });
  } catch (error) {
    console.log(error);
  }
};
