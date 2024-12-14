import db from "../models/index.js";

const Document_ajuan = db.tbl_document_ajuan;

export const addDocumentToReq = async (req, res) => {
  const { name_document, file, id_req } = req.body;

  try {
    //MAKE REQUEST
    const document = await Document_ajuan.create({
      name_document: name_document,
      file: file,
      id_req: id_req,
    });

    return res.status(201).json({
      code: 201,
      status: true,
      msg: "Document added successfully",
      data: document,
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

export const updateDocumentToReq = async (req, res) => {
  const { id } = req.params;
  const { name_document, file, id_req } = req.body;

  try {
    //MAKE REQUEST
    const document = await Document_ajuan.update(
      {
        name_document: name_document,
        file: file,
        id_req: id_req,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Update document successfully",
      data: document,
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

export const deleteDocumentFromReq = async (req, res) => {
  const { id } = req.params;

  try {
    await Document_ajuan.destroy({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Delete document Successfully",
      data: req,
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
