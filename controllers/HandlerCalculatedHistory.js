import db from "../models/index.js";

const Calculated = db.tbl_calculated;
export const getHistoryCalculated = async (req, res) => {
  try {
    const calculated = await Calculated.findAll({});
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: calculated,
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
