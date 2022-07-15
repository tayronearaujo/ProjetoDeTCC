const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const {originalName, mimetype, filename} = req;


  const reqObjetct = {
    fileName: originalName,
    fileType: mimetype,
    savedFileName: filename
  }

  return res.json({response: reqObjetct});
});


module.exports = routes;
