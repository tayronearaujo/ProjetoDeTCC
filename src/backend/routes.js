
const { execFile } = require('child_process');
// const util = require("util");
const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");


routes.post("/upload", multer(multerConfig).array("uploadFiles", 2), async (req, res) => {
  console.log("req.files",req.files)
  console.log("req.file",req.file)

  return res.json("Sucess send files");
});

routes.get("/videoProcess", async (req, res) => {
  const py = execFile('python', ['src/modules/videoProcess/main.py'], (error, stdout, stderr) => {
    if (error || stderr) {
     console.log('error',error)
    } else {
      res.send(stdout)
    }
  })
});

module.exports = routes;
