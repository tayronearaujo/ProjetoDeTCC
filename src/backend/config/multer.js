const multer = require("multer");
const path = require("path");
//const crypto = require("crypto");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "..","..", "objects-behavior-visual-analysis-system", "uploadFiles"));
    },
    filename: (req, file, cb) => {
      file.key = `${file.originalname}`;
      cb(null, file.key);
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "video/mp4",
      "application/json"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(file.originalname));
    }
  }
};
