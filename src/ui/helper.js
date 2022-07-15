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