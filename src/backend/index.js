require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer")
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const upload = multer(
  {
    dest: path.resolve(__dirname, "..","/"),
    storage: multer.diskStorage({
      destination: (req, file, cb) => {  
        cb(null, path.resolve("../diretorioBackend"));
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
  }
);

app.post("/upload", upload.array("uploadFiles"), (req, res) => {
    // const tempPath = req.file.path;
    // const targetPath = path.join(__dirname);
    // console.log('tempPath ->',tempPath)
    // console.log('targetPath ->',targetPath)
    console.log(req.files)

    res
    .status(200)
    .end("File uploaded!");

    // if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    //   fs.rename(tempPath, targetPath, err => {
    //     if (err) return handleError(err, res);

    //     res
    //       .status(200)
    //       .contentType("text/plain")
    //       .end("File uploaded!");
    //   });
    // } else {
    //   fs.unlink(tempPath, err => {
    //     if (err) return handleError(err, res);

    //     res
    //       .status(403)
    //       .contentType("text/plain")
    //       .end("Only .png files are allowed!");
    //   });
    // }
  }
);

app.get("/videoProcess", async (req, res) => {
  res
  .status(200)
  .end("File uploaded!");
  // const py = execFile('python', ['src/modules/videoProcess/main.py'], (error, stdout, stderr) => {
  //   if (error || stderr) {
  //    console.log('error',error)
  //   } else {
  //     res.send(stdout)
  //   }
  // })
});

//app.use(require("./routes"));

app.listen(3000);
