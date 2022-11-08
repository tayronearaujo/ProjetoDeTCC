const listElement = document.querySelector("#user__list");
const toastElement = document.querySelector("#toast");

const dropArea = document.querySelector(".drag-area");
const fileNameElement = document.querySelector("#filename");
// const uploadFormElement = document.querySelector("#uploadform");
const uploadButtonElement = document.querySelector("#uploadButton");
const uplaodInputElement = document.querySelector("#fileUpload");

const algorithm = document.querySelector('#menu-algorithm').value;

const selectFilebutton = document.querySelector("#drag-area-button");
selectFilebutton.onclick = () => {
  uplaodInputElement.click();
}

function renderProject(type) {
  const project = type === '0' ? `<iframe src="http://127.0.0.1:5501/index.html" class="iframe"></iframe>` : '<iframe src="http://127.0.0.1:5501/index.html" class="iframe"></iframe>';
  listElement.innerHTML = project;
}

uplaodInputElement.addEventListener("change", (event) => {
  event.preventDefault()
  const fileNameTag = `
    <i class="fa-solid fa-file-arrow-down fa-3x icon"></i>
    <span>${uplaodInputElement.files[0].name}</span>
  `;

  dropArea.innerHTML = fileNameTag;
});

const handleRequest = async () => {
  const fileUpload = uplaodInputElement.files[0]
  const formData = new FormData()
  formData.append('file', uplaodInputElement.files[0])

  console.log(fileUpload)

  try {
    const response = fetch('http://localhost:3000/posts', {
      method: 'POST',
      body: formData
    })

    const responseApi = response.json()
    console.log(responseApi)

  } catch (error) {
    console.error(error)
  }
  
  if(fileUpload){ 
    renderProject(parseInt(algorithm))

  }else {
    return creatToast('toast_error', ' Nenhum arquivo selecionado')
  }
}

//toast type - toast_error / toast_warning / toast_success
function creatToast(type, status) {
  const toast = `
    <div class="content__toast__element">
      <i class="fa-solid fa-circle-exclamation fa-2x"></i>
      <span>&nbsp${status}</span>
    </div>
  `;
  toastElement.innerHTML = toast;
  toastElement.className = type;
  setTimeout(() => { toastElement.className = 'content__toast' }, 5000);
}

function saveToStorage(item, data) {
  localStorage.setItem(item, JSON.stringify(data));
}

function getToStorage(item) {
  return JSON.parse(localStorage.getItem(item));
}

// handleSelectedElement()
