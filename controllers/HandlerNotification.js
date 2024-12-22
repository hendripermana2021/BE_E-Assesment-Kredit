import db from "../models/index.js";
import { Op } from "sequelize";

const Notification = db.tbl_notification;
export const getDataNotification = async (req, res) => {
  try {
    const notification = await Notification.findAll({
      where: {
        user_id: req.user.userId,
      },
    });
    if (notification == "") {
      return res.status(401).json({
        code: 401,
        status: true,
        msg: "Don't Have Notification",
      });
    }

    const sortfill = notification.sort((b, a) => a.id - b.id);

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

export const getDataNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOne({
      where: { user_id: req.user.userId, id },
    });
    if (notification == "") {
      return res.status(404).json({
        code: 404,
        status: true,
        msg: "Notification Doesn't Exist",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: notification,
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

export const createNotification = async (req, res) => {
  const { message } = req.body;

  try {
    const notification = await Notification.create({
      message,
      user_id: req.user.userId,
    });
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Create Data Notification berhasil",
      data: req.body,
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

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  const dataBefore = await Notification.findOne({
    where: { id },
  });
  const parsedDataProfile = JSON.parse(JSON.stringify(dataBefore));

  if (!parsedDataProfile) {
    return res.status(404).json({
      code: 404,
      status: false,
      msg: "Data Notification doesn't exist or has been deleted!",
    });
  }

  await Notification.destroy({
    where: { id },
  });

  return res.status(200).json({
    code: 200,
    status: true,
    msg: "Delete Data Notification Successfully",
    data: dataBefore,
  });
};

export const readNotify = async (req, res) => {
  try {
    const notification = await Notification.findAll({
      where: {
        user_id: req.user.userId,
      },
    });

    if (notification == "") {
      return res.status(401).json({
        code: 401,
        status: true,
        msg: "Don't Have Notification",
      });
    }
    await Notification.update(
      {
        isRead: true,
      },
      {
        where: { user_id: req.user.userId },
      }
    );

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Notification All Read",
    });
  } catch (error) {}
};
