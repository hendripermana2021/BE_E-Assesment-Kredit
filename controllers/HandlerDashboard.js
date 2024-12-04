import db from "../models/index.js";

const Users = db.tbl_pegawai;
const Nasabah = db.tbl_santri;
const Kriteria = db.tbl_kriteria;
const Notif = db.tbl_notification;

export const dashboard = async (req, res) => {
  try {
    const currentUser = req.user;
    const user_id = req.user.userId;
    const status = req.query.status;
    if (currentUser.role_id == 1) {
      const nasabah = (await Users.findAll()).length;
      const users = (await Nasabah.findAll()).length;
      const kriteria = (await Kriteria.findAll()).length;
      const notif = await Notif.findAll();
      const nasabahApprove = (
        await Nasabah.findAll({ where: { status: "Approve" } })
      ).length;

      const sortfill_notif = notif.sort((b, a) => a.id - b.id);

      return res.status(200).json({
        code: 200,
        status: true,
        msg: "Dashboard for Admin",
        data: {
          currentUser,
          nasabah,
          users,
          kriteria,
          nasabahApprove,
          sortfill_notif,
        },
      });
    } else if (currentUser.role_id == 2) {
      const nasabah = await Nasabah.findAll({
        where: {
          created_by: user_id,
          status_ajuan: status,
        },
      });

      return res.status(200).json({
        code: 200,
        status: true,
        msg: "Dashboard For Ustadz/ah",
        data: nasabah,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "An error occurred during the update.",
      error: error.message,
    });
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Internal Server Error",
    });
  }
};
