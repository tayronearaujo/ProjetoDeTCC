require("dotenv").config();
const { spawn } = require('child_process');
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer")
const path = require("path");
const app = express();
const fs = require('fs');



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


app.get('/run-python', async (req, res) => {
  const pythonFile = 'src/modules/videoProcess/main.py';

  fs.access(pythonFile, fs.constants.R_OK, (err) => {
    if (err) {
      console.error(`Erro ao acessar o arquivo ${pythonFile}: ${err.message}`);
      // Faça o tratamento de erro adequado aqui
    } else {
      console.log(`O arquivo ${pythonFile} é acessível.`);
      // Prossiga com a execução do servidor Node.js
    }
  });

  
  try {
    const pythonProcess = spawn('python', [pythonFile]);

    let output = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    await new Promise((resolve) => {
      pythonProcess.on('close', () => {
        console.log(`Processo Python encerrado com sucesso !`);
        resolve();
      });
    });

    res.status(200).send(output);
  } catch (error) {
    console.error('Erro ao executar o processo Python:', error);
    res.status(500).send('Erro ao executar o processo Python');
  }
});


// app.post('/run-python', (req, res) => {
//   const pythonFile = 'src/modules/videoProcess/main.py';

//   const pythonProcess = spawn('python', [pythonFile]);

//   pythonProcess.stdout.on('data', (data) => {
//     console.log(`Saída do Python: ${data}`);
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     console.error(`Erro do Python: ${data}`);
//   });

//   pythonProcess.on('close', (code) => {
//     console.log(`Processo Python encerrado com código de saída ${code}`);
//     res.status(200).send(`Processo Python encerrado com código de saída ${code}`);
//   });
// });

app.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});