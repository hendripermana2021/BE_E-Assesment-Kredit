import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Users = db.tbl_users;
const Role = db.tbl_role;

export const handleGetRoot = async (req, res) => {
  return res.status(200).json({
    code: 200,
    status: "OK",
    msg: "E-Assesment Status Activated",
  });
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const users = await Users.findOne({
      where: {
        refreshtoken: refreshToken,
      },
    });

    if (!pegawai) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }

        const { role_id, name_user, email } = users;
        const accessToken = jwt.sign(
          { userId: role_id, name_user, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );

        return res.status(200).json({
          code: 200,
          status: true,
          msg: "This your Token",
          data: accessToken,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const whoAmI = async (req, res) => {
  try {
    const currentUser = req.user;
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "This data Users Login Now",
      data: currentUser,
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

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Email not found",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Incorrect password",
      });
    }

    const { id, name_user, gender, role_id, email } = user;

    const accessToken = jwt.sign(
      { id, name_user, gender, email, role_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id, name_user, gender, email, role_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Pegawai.update(
      { refreshtoken: refreshToken, accesstoken: accessToken },
      { where: { id } } // Use id directly without indexing
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "Lax",
    });

    return res.status(200).json({
      code: 200,
      msg: "Login successful",
      token: accessToken,
    });
  } catch (error) {
    console.error("System failure:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "System failure",
    });
  }
};

export const getEmailUsers = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: user,
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

export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(200).json({
        code: 200,
        status: false,
        msg: "User has been logged out",
      });
    }

    const user = await Users.findOne({
      where: {
        refreshtoken: refreshToken,
      },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "User not found",
      });
    }

    const userId = user.id;

    await Users.update(
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
      msg: "You have been logged out",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Internal Server Error",
    });
  }
};

export const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findOne({
    where: { id },
  });

  if (!user) {
    return res.status(404).json({
      code: 404,
      status: false,
      msg: "Users Account doesn't exist or has been deleted!",
    });
  }

  await Users.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Pegawai Successfully",
    data: dataBefore,
  });
};

export const RegisterUsers = async (req, res) => {
  const { name_user, gender, email, password, role_id } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const user = await Users.create({
      name_user,
      gender,
      email,
      password: hashPassword,
      real_password: password,
      role_id,
    });
    return res.status(201).json({
      code: 201,
      status: true,
      msg: "Register Data Users berhasil",
      data: user,
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

export const getDataUsers = async (req, res) => {
  try {
    const user = await Users.findAll({
      include: {
        model: Role,
        as: "role",
      },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: true,
        msg: "Data not found",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "This Data All Pegawai",
      data: user,
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

export const getDataUsersId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findAll({
      where: { id: id },
    });
    if (user == "") {
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
      data: user,
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

export const updateDataUsers = async (req, res) => {
  const { id } = req.params;
  const { name_user, gender, email, password, role_id } = req.body;

  try {
    const user = await Users.findOne({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Users doesn't exist or has been deleted!",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user_created = await Pegawai.update(
      {
        name_user,
        gender,
        email,
        password: hashPassword,
        real_password: password,
        role_id,
      },
      {
        where: { id },
      }
    );

    const user_new = await Users.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Users Success Updated",
      data: { user, user_new },
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
