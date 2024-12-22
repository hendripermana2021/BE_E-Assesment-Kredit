import { where } from "sequelize";
import db from "../models/index.js";

const Users = db.tbl_users;
const Nasabah = db.tbl_nasabah;
const Kriteria = db.tbl_kriteria;
const Notif = db.tbl_notification;
const Req = db.tbl_req;

export const dashboard = async (req, res) => {
  try {
    const currentUser = req.user;
    if (currentUser.role_id == 1) {
      const nasabah = (await Nasabah.findAll()).length;
      const users = (await Users.findAll()).length;
      const kriteria = (await Kriteria.findAll()).length;
      const notif = await Notif.findAll();
      const nasabahReject = (
        await Req.findAll({
          where: { status_ajuan: "Ditolak" },
          include: [{ model: Nasabah, as: "nasabah" }],
        })
      ).length;
      const nasabahApprove = await Req.findAll({
        where: { status_ajuan: "Diterima" },
      });

      const nasabahRequest = (
        await Req.findAll({
          where: { status_ajuan: "Aktif" },
          include: [{ model: Nasabah, as: "nasabah" }],
        })
      ).length;

      const sortfill_notif = notif.sort((b, a) => a.id - b.id);

      let dana = 0; // Initialize dana to 0 before the loop

      for (let i = 0; i < nasabahApprove.length; i++) {
        dana += nasabahApprove[i].jlh_dana; // Add jlh_dana to dana
        console.log(dana); // This will print the running total after each iteration
      }

      return res.status(200).json({
        code: 200,
        status: true,
        msg: "Dashboard for Admin",
        data: {
          currentUser,
          nasabah,
          users,
          kriteria,
          ajuan_approve: nasabahApprove.length,
          ajuan_reject: nasabahReject,
          ajuan_ready: nasabahRequest,
          jumlah_dana: dana,
          sortfill_notif,
        },
      });
    } else {
      const nasabah = (
        await Nasabah.findAll({
          where: {
            id_user: currentUser.userId,
          },
        })
      ).length;
      const nasabahReject = (
        await Req.findAll({
          where: { status_ajuan: "Ditolak", created_by: currentUser.userId },
          include: [{ model: Nasabah, as: "nasabah" }],
        })
      ).length;
      const nasabahApprove = await Req.findAll({
        where: { status_ajuan: "Diterima", created_by: currentUser.userId },
      });

      const nasabahRequest = (
        await Req.findAll({
          where: { status_ajuan: "Aktif", created_by: currentUser.userId },
          include: [{ model: Nasabah, as: "nasabah" }],
        })
      ).length;

      return res.status(200).json({
        code: 200,
        status: true,
        msg: "Dashboard for Admin",
        data: {
          currentUser,
          nasabah,
          ajuan_approve: nasabahApprove.length,
          ajuan_reject: nasabahReject,
          ajuan_ready: nasabahRequest,
        },
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
  }
};
