const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

routes.post("/upload", multer(multerConfig).array("uploadFiles", 2), async (req, res) => {

  return res.json("Sucess send files");
});

module.exports = routes;
