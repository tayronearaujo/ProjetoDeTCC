
const { execFile } = require('child_process');
const util = require("util");
//const { PythonShell } = require('python-shell');
const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const { stdout } = require('process');

routes.post("/upload", multer(multerConfig).array("uploadFiles", 2), async (req, res) => {
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

//const uploadFilesMiddleware = util.promisify(routes);

module.exports = routes;
