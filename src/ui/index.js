const listElement = document.querySelector("#user__list");
const toastElement = document.querySelector("#toast");
const filesListNames = document.querySelector("#files-list");
//const fileNameElement = document.querySelector("#filename");
// const uploadFormElement = document.querySelector("#uploadform");
const uploadButtonElement = document.querySelector("#uploadButton");
const uplaodInputElement = document.querySelector("#fileUpload");
const algorithm = document.querySelector('#menu-algorithm');

const codeSnippet = document.querySelector('#code-snippet');


// const selectFilebutton = document.querySelector("#drag-area-button");
// selectFilebutton.onclick = () => {
//   uplaodInputElement.click();
// }

const renderProject = (type) => {
  const project = type === '0' ? `<iframe src="http://127.0.0.1:5501/index.html" class="iframe"></iframe>` : '<iframe src="http://127.0.0.1:5501/index.html" class="iframe"></iframe>';
  listElement.innerHTML = project;
}

uplaodInputElement.addEventListener("change", (event) => {
  event.preventDefault()
  const list = []

 for (let i = 0; i < uplaodInputElement.files.length; i++) {
  list.push(uplaodInputElement.files[i].name)
  
 }
  handleUploadFilesList(list)
});

const handleUploadFilesList = (filesItem) => {
  const renderList = `${filesItem.map(listItemName => `
    <li class="files_list_row"> ${listItemName}</li>
    `
  ).join('')}`
  filesListNames.innerHTML = renderList;
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

const exempleJsonData = () => {
  const snippet = {
    "label": "person0",
    "trajectory": [
      {
          "frame": 40,
          "cx": 78,
          "cy": 67,
          "dx": 11,
          "dy": 7
      },
      {
          "frame": 41,
          "c": 78,
          "cy": 68,
          "dx": 11,
          "dy": 8
      }
    ]
  }

  let teste = { foo: "sample", bar: "sample" };


  codeSnippet.innerHTML = JSON.stringify(teste, null, 4);
}

const handleFile = (files) => {
  const objKeys = ["frame", "cx", "cy", "dx", "dy"]
  let validFile = true

  const reader = new FileReader();

  reader.onload = (event) => {
    let data = event.target.result;    
    data = JSON.parse(data)

    console.log(data)

    validFile = data.hasOwnProperty("label")
    validFile = data.hasOwnProperty("trajectory")
    data.trajectory.map(obj =>{
      for (var i = 0; i < objKeys.length; i++) {
        validFile = obj.hasOwnProperty(objKeys[i])
        if (!obj.hasOwnProperty(objKeys[i])) {
          validFile = obj.hasOwnProperty(objKeys[i])
          break;
        }
      }
    })

    console.log(validFile ? 'Arquivo com Formato correto' : 'Arquivo com Formato incorreto')

    saveToStorage('validFile', {validFile: validFile})
  } 

  reader.readAsText(files[0]);
}

const handleRequest = async () => {
  const fileUpload = uplaodInputElement.files[0]
  const formData = new FormData()
  formData.append('file', uplaodInputElement.files[0])

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
    renderProject(parseInt(algorithm.value))

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

setSelectOptions()
