const dropArea = document.querySelector(".drag-area");

const dragText = dropArea.querySelector("header");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("input");
let file;

const inputFileElement = document.querySelector("#fileUpload");

button.onclick = () => {
  input.click();
}

input.addEventListener("change", function () {
  file = this.files[0];
  dropArea.classList.add("active");
  showFile();
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];

  console.log('event.dataTransfer.files[0]', event.dataTransfer.files[0])
  showFile();
});

function showFile() {
  const fileType = file.type;
  const validExtensions = [
    "image/jpeg",
    "image/png",
    "video/mp4",
    "video/webm",
    "video/ogg"
  ];

  if (validExtensions.includes(fileType)) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag;
    }
    fileReader.readAsDataURL(file);
  } else {
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

// async function handleConfig() {
//   try {
//     const response = await fetch('config.json');
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     const data = await response.json();
//     setSelectOptions(data)
//   }
//   catch (error) {
//     console.error(`Could not get data: ${error}`);
//   }
// }


// const asynchronousFunction = callback => {
//   return fetch('./config.json')
//     .then(response => response.json())
//     .then(json => {
//       callback(json);
//     }).catch(err => {
//       console.error('fetch failed', err);
//     });
// }

// async function asynchronousFunction() {
//   try {
//     const response = await fetch('./config.json');
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     //callback(await response.json());
//     const data = await response.json()
//     console.log(data)

//     return Promise.resolve(data)

//   } catch (err) {
//     console.log('fetch failed', err);
//   }
// }

// const callbackFunction = result => {
//   console.log(result)
//   return result
// }

// const mainFunction = callback => {
//   asynchronousFunction(callback)
// }

//mainFunction(callbackFunction)





  // if(filesListLength === 2){
  //   try {
  //     const response = fetch('http://localhost:3000/upload', {
  //       method: 'POST',
  //       body: formData
  //     })

  //     const responseApi = await response
    
  //     if(responseApi.status === 200){
  //       console.log('status 200')
  //       renderProject(parseInt(algorithm.value))
  //     }

  //   } catch (error) {
  //     creatToast('toast_error', 'Erro ao enviar arquivos !')
  //   }
  // }
  // else {
  //   console.log('erro')
  // // filesListLength > 2 ? 
  // //   creatToast('toast_error', 'Muitos arquivos selecionados para envio !') :
  // //   creatToast('toast_error', `E necessário enviar mais de ${filesListLength} arquivo !`) 
  // }