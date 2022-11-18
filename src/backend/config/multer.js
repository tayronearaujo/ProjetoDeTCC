const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
//cb(null, path.resolve(__dirname, "..", "..", "..", "tmp", "uploads"));

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "..","..", "objects-behavior-visual-analysis-system", "video_files","Meet_Crowd"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(5, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "video/mp4",
      // "video/webm",
      // "video/ogg",
      "application/json"
    ];

    if (allowedMimes.includes(file.mimetype) || file.originalname.includes(".rar")) {
      cb(null, true);
    } else {
      cb(new Error(file.originalname));
    }
  }
};
