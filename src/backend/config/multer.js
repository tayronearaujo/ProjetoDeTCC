const multer = require("multer");
const path = require("path");
//const crypto = require("crypto");
// http://127.0.0.1:5500/diretorioBackend/

async function handleConfig() {
  try {
    const response = await fetch('http://127.0.0.1:5500/tcc/config.js');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
   
    console.log(data)

  }
  catch (error) {
    console.error(`Could not get data: ${error}`);
  }
}

// handleConfig()
//http://127.0.0.1:5500/objects-behavior-visual-analysis-system/uploadFiles/

module.exports = {
  dest: path.resolve(__dirname, "http://127.0.0.1:5500", "/diretorioBackend"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {  
      //cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
      cb(null, path.resolve("http://127.0.0.1:5500/diretorioBackend"));
    },
    filename: (req, file, cb) => {
      if(file.originalname.includes('.mp4'))
        file.key = 'video.mp4';
      else 
        file.key = 'detections.json';

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
