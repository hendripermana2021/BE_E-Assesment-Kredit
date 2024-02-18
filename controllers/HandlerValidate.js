import db from "../models/index.js";
const Req = db.tbl_req;
const Santri = db.tbl_santri;
const Pegawai = db.tbl_pegawai;
const Notif = db.tbl_notification;

export const validation = async (req, res) => {
  const { validation_code } = req.body;
  const user = req.user;

  try {
    const req = await Req.findAll({
      where: { validation_code },
    });

    if (req == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    const updateCode = await Req.update(
      { permission_status: 1, val_go_by: user.userId },
      {
        where: { validation_code },
      }
    );

    const reqUpdate = await Req.findOne({
      where: { validation_code },
    });

    const updateStatusSantri = await Santri.update(
      { status: 0 },
      {
        where: { id: reqUpdate.student_id },
      }
    );

    const notif = await Notif.create({
      user_id: user.userId,
      message: `Permission validation by ${user.name_pegawai} noted in ${reqUpdate.createdAt}`,
      isRead: 0,
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: notif.message,
      data: reqUpdate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const validationBack = async (req, res) => {
  const { validation_code } = req.body;
  const user = req.user;

  try {
    const req = await Req.findAll({
      where: { validation_code },
    });

    if (req == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }

    const updateCode = await Req.update(
      { status_req: 0, permission_status: 0, val_back_by: user.userId },
      {
        where: { validation_code },
      }
    );

    const reqUpdate = await Req.findOne({
      where: { validation_code },
    });

    const santri = await Santri.findOne({
      where: { id: reqUpdate.student_id },
    });

    const notif = await Notif.create({
      user_id: user.userId,
      message: `Santri A.N. ${santri.name_santri} has go back and validation by ${user.name_pegawai} noted in ${reqUpdate.createdAt}`,
      isRead: 0,
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: notif.message,
      data: reqUpdate,
    });
  } catch (error) {
    console.log(error);
  }
};
