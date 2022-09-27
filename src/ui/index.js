const listElement = document.querySelector("#user__list");
const toastElement = document.querySelector("#toast");

const dropArea = document.querySelector(".drag-area");
const fileNameElement = document.querySelector("#filename");
const uploadButtonElement = document.querySelector("#uploadButton");
const uplaodInputElement = document.querySelector("#fileUpload");

const algorithm = document.querySelector('#menu-algorithm');

const teste = document.querySelector(".teste");

const spinner = `<span class="loader"></span>`;


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

  dropArea.innerHTML = spinner;

  setTimeout(() => { dropArea.innerHTML = fileNameTag; }, 3000);
  
});

const handleRequest = () => {
  const fileUpload = uplaodInputElement.files[0]
  const formData = new FormData()
  formData.append('file', uplaodInputElement.files[0])

  if(fileUpload){    
    renderProject(parseInt(algorithm.value))

  }else {
    return creatToast('toast_error', ' Nenhum arquivo selecionado')
  }
}

const handleNextPage = () =>{
  const x = `
    <div class="button_content">
    <button class="saveButton" onclick="" id="uploadButton"> Extrair Informações  </button>
    </div>

    <div class="button_content">
    <button class="saveButton" onclick="" id="uploadButton"> Carregar Informações </button>
    </div>
  `

  
  dropArea.innerHTML = spinner;

  setTimeout(() => { teste.innerHTML = x;}, 3000);
  
  
}


const setSelectOptions = () => {

  const selectOptions = `
    <option value="" disabled selected>Selecione como deseja realizar sua analize</option>
    <option class="algorithm-option" value="0">Objects behavior visual analysis system</option>
    <option class="algorithm-option" value="1">Analysis X</option>
    <option class="algorithm-option" value="2">Analysis Y</option>
  `;

  algorithm.innerHTML = selectOptions;
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



setSelectOptions();

// handleSelectedElement()

// fetch('http://localhost:3000/posts', {
//   method: 'POST',
//   body: formData
// })
// .then(res => { 
  
//   console.log(res.json())

// })
// .then(json => {
//   // creatToast('toast_success', 'Arquivo gravado')
//   console.log(json)
// })
// .catch(err => console.error(err));