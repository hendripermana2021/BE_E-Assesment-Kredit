import db from "../models/index.js";

const Pegawai = db.tbl_pegawai;
const Santri = db.tbl_santri;
const Kriteria = db.tbl_kriteria;
const Room = db.tbl_room;

export const dashboardPage = async (req, res) => {
  try {
    const currentUser = req.user;
    const santri = (await Santri.findAll()).length;
    const pegawai = (await Pegawai.findAll()).length;
    const kriteria = (await Kriteria.findAll()).length;
    const room = (await Room.findAll()).length;
    res.status(200).json({
      code: 200,
      status: true,
      msg: "This data Users Login Now",
      data: { currentUser, santri, pegawai, kriteria, room },
    });
  } catch (error) {
    console.log(error);
  }
};
