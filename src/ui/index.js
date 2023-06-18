const fileConfigElement = document.querySelector("#file-config")
const filesInfoElement = document.querySelector("#file-info");
const algorithm = document.querySelector('#menu-algorithm');
const codeSnippet = document.querySelector('#code-snippet');

const listElement = document.querySelector("#user__list");
const toastElement = document.querySelector("#toast1");

document.addEventListener("click", e => {
  const target = e.target.textContent;
  const filesListNamesElement = document.querySelector("#files-list");
  const uplaodInputElement = document.querySelector("#fileUpload");

  if(target === "Selecionar arquivos"){
    uplaodInputElement.click();

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
      //handleFile(jsonFileList)
      handleUploadFilesList(filesListNames, filesListNamesElement)
    }); 
  }
});

const handleUploadFilesParams = (destination, text) =>{
  return text.replace(/destination/g, destination);
}

const renderProject = (type, query) => {

//src=${config[type].serverDirectory}?${handleUploadFilesParams(config[type].destinationApiFiles, query)}

  const projectIframe = `
    <iframe 
      src=${config[type].serverDirectory}
      class="iframe"
    ></iframe>
  `

  listElement.innerHTML = projectIframe;
}

const setFileInfo = () => {
  let selectedValue = algorithm.options[algorithm.selectedIndex].value; 

  const defaultFileParam =` ${config[selectedValue].defaultParameters.map(params =>`
    <p>${params.description}</p>
    <code>${params.extension}</code> 
  `
  ).join('')}`

  const elements = `
    <h1 class="subtitle">Para que o sistema funcione corretamente, é necessário:</h1>

    <div class="file_info" id="file-info">
      ${defaultFileParam}
    </div>

    <button class="file_upload" id="drag-area-button" >Selecionar arquivos</button>

    <input type="file" id="fileUpload" name="uploadFiles" multiple hidden>
 
    <ul class="files_list" id="files-list">
      <li class="files_list_row"> 
        <i class="fa-sharp fa-solid fa-file-excel icon"></i>
      </li>
    </ul>

    <div id="toast" class="content__toast">
      <div class="content__toast__element" id="toast1"></div>
    </div>
    
    <button class="saveButton" onClick="handleRequest()" id="uploadButton" type="submit"> 
      Carregar sistema 
    </button>
  `
  fileConfigElement.innerHTML = elements;

  const uploadButtonElement = document.querySelector("#uploadButton");

  setStatusButton('disabled',uploadButtonElement)
}

const getFirstLetters  = (str) => {
  const firstLetters = str
    .split(' ')
    .map(word => word[0])
    .join('');

  return firstLetters;
}

const setSelectOptions = (options) => {
  const selectOptions = [
    '<option value="" disabled selected>Selecione o método que deseja utilizar</option>'
  ]

  options.map((option, index) => {
    selectOptions.push(`
      <option class="algorithm-option" onclick="setFileInfo()" value="${index}">${option.name}</option>
    `)
  })
 
  algorithm.innerHTML = selectOptions;

}

const handleUploadFilesList = (filesItem, listElement) => {
  const listSize = filesItem.length
  const renderList = `${filesItem.map(listItemName => `
    <li class="files_list_row"> 
      <i class="fa-solid fa-file-arrow-down icon"></i>
      ${listItemName}
    </li>
    `
  ).join('')}`
  listElement.innerHTML = renderList;

 if(listSize >= 1)  setStatusButton('enabled')

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
  const uploadButtonElement = document.querySelector("#uploadButton");
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
  const uplaodInputElement = document.querySelector("#fileUpload");
  const uploadFiles = uplaodInputElement.files
  const filesListLength = uploadFiles.length
  const formData = new FormData()
  let uploadQueryFilesData = ''

  for (var i = 0; i < filesListLength; i++) {
    formData.append('uploadFiles', uploadFiles[i])
    uploadQueryFilesData = uploadQueryFilesData + `file${i + 1}=destination${uploadFiles[i].name}&`
  }
  
  //console.log(`src=${config[parseInt(algorithm.value)].serverDirectory}?${handleUploadFilesParams(config[parseInt(algorithm.value)].destinationApiFiles, uploadQueryFilesData)}`)

  try {
    const response = fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })

   const responseApi = await response

    if(responseApi.status === 200){
      renderProject(parseInt(algorithm.value), uploadQueryFilesData)
    }

  } 
  catch (error) {
    console.log("erro", error)
  }
}

//toast type - toast_error / toast_warning / toast_success
const creatToast = (type, status) => {
  const toast = `
   
    <i class="fa-solid fa-circle-exclamation fa-1x"></i>
    <span>&nbsp${status}</span>

  `;
  toastElement.innerHTML = toast;
  toastElement.classList.add(type);
  setTimeout(() => { toastElement.className = 'content__toast' }, 3000);
}

const saveToStorage = (item, data) =>{
  localStorage.setItem(item, JSON.stringify(data));
}

const getToStorage = (item) => {
  return JSON.parse(localStorage.getItem(item));
}

//handleConfig()
setSelectOptions(config)