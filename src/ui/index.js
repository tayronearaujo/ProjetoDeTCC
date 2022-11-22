const listElement = document.querySelector("#user__list");
const toastElement = document.querySelector("#toast1");
const filesListNames = document.querySelector("#files-list");
const uploadButtonElement = document.querySelector("#uploadButton");
const uplaodInputElement = document.querySelector("#fileUpload");
const algorithm = document.querySelector('#menu-algorithm');
const codeSnippet = document.querySelector('#code-snippet');
const selectFilebutton = document.querySelector("#drag-area-button");

selectFilebutton.onclick = () => {
  uplaodInputElement.click();
}

const renderProject = (type) => {
  console.log('renderProject -->',type)
  const project = type === '0' ? `<iframe src="http://127.0.0.1:5501/index.html" class="iframe"></iframe>` : '<iframe src="http://127.0.0.1:5501/index.html" class="iframe"></iframe>';
  //listElement.innerHTML = project;
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

uplaodInputElement.addEventListener("change", (event) => {
  event.preventDefault()
  const filesListNames = []
  const jsonFileList = []
  const inputFiles = uplaodInputElement.files
  
  for (let i = 0; i < inputFiles.length; i++) {
    filesListNames.push(inputFiles[i].name)

    if(inputFiles[i].name.includes('.json'))
      jsonFileList.push(inputFiles[i])

  }
  handleFile(jsonFileList)
  handleUploadFilesList(filesListNames)
});

const handleUploadFilesList = (filesItem) => {
  const renderList = `${filesItem.map(listItemName => `
    <li class="files_list_row"> 
      <i class="fa-solid fa-file-arrow-down icon"></i>
      ${listItemName}
    </li>
    `
  ).join('')}`
  filesListNames.innerHTML = renderList;
}

const handleFile = (files) => {
  const reader = new FileReader()
  let label = false
  let trajectory = false
  let frame = false
  let cx = false
  let cy = false
  let dx = false
  let dy = false
  let validFile = false

  reader.onload = (event) => {
    let data = event.target.result;
    data = JSON.parse(data)

    data.map(obj => {
      label = obj.hasOwnProperty("label")
      trajectory = obj.hasOwnProperty("trajectory")

      obj.trajectory.map(objFrames => {
        frame = objFrames.hasOwnProperty("frame")
        cx = objFrames.hasOwnProperty("cx")
        cy = objFrames.hasOwnProperty("cy")
        dx = objFrames.hasOwnProperty("dx")
        dy = objFrames.hasOwnProperty("dy")
      })
    })

    validFile = label && trajectory && frame && cx && cy &&  dx && dy

    if(validFile){
      console.log('Arquivo com formato correto')
      saveToStorage('validFile', { validFile: validFile })
      setStatusButton('enabled')
    }
    else {
      console.error('Arquivo com formato incorreto')
      setStatusButton("disabled")
    }
  }
  reader.readAsText(files[0]);
}

const setStatusButton = (status) => {
  if(status  === "disabled"){
    uploadButtonElement.disabled = true
    uploadButtonElement.classList.add("disabledButton");
  }
  else {
    uploadButtonElement.disabled = false
    uploadButtonElement.classList.remove("disabledButton");
  } 
}

const handleRequest = async () => {
  const uploadFiles = uplaodInputElement.files
  const filesListLength = uploadFiles.length
  const formData = new FormData()
  formData.append('uploadFiles', uploadFiles)
  
  if(filesListLength === 2){
    try {
      const response = fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      })
      const responseApi = await response
    
      if(responseApi.status === 200){
        console.log('status 200')
        renderProject(parseInt(algorithm.value))
      }

    } catch (error) {
      creatToast('toast_error', 'Erro ao enviar arquivos !')
    }
  }
  else {
  filesListLength > 2 ? 
    creatToast('toast_error', 'Muitos arquivos selecionados para envio !') :
    creatToast('toast_error', `E necessário enviar mais de ${filesListLength} arquivo !`) 
  }
}

//toast type - toast_error / toast_warning / toast_success
function creatToast(type, status) {
  const toast = `
   
    <i class="fa-solid fa-circle-exclamation fa-1x"></i>
    <span>&nbsp${status}</span>

  `;
  toastElement.innerHTML = toast;
  toastElement.classList.add(type);
  setTimeout(() => { toastElement.className = 'content__toast' }, 3000);
}

function saveToStorage(item, data) {
  localStorage.setItem(item, JSON.stringify(data));
}

function getToStorage(item) {
  return JSON.parse(localStorage.getItem(item));
}

setStatusButton("disabled")
setSelectOptions()