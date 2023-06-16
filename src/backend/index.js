require("dotenv").config();
const { spawn } = require('child_process');
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
    dest: path.resolve(__dirname, ".","/"),
    storage: multer.diskStorage({
      destination: (req, file, cb) => {  
        cb(null, path.resolve("src/modules/videoProcess/uploadFiles"));
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
  }
);

app.post("/upload", upload.array("uploadFiles"), (req, res) => {
   
  if (req.files) {
    console.log(`${req.files.length} arquivos recebidos com sucesso!`);
    res.status(200).send(`${req.files.length} arquivos recebidos com sucesso!`);
  } else {
    console.log('Nenhum arquivo foi enviado.');
    res.status(400).send('Nenhum arquivo foi enviado.');
  }

  }
);

app.post('/run-python', (req, res) => {
  const pythonFile = 'src/modules/videoProcess/main.py';

  const pythonProcess = spawn('python', [pythonFile]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Saída do Python: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Erro do Python: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Processo Python encerrado com código de saída ${code}`);
    res.status(200).send(`Processo Python encerrado com código de saída ${code}`);
  });
});

app.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});