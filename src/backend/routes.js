const util = require("util");
const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

routes.post("/upload", multer(multerConfig).array("uploadFiles", 2), async (req, res) => {

  // console.log(req.body.file)

  return res.json("Sucess send files");
});

const uploadFilesMiddleware = util.promisify(routes);

module.exports = uploadFilesMiddleware;
