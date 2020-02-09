const { ipcRenderer } = require('electron');
function cmdBtn(cmd) {
    console.log('runnin')
    ipcRenderer.send('runConsoleCmd', {cmd: cmd})
    

}
let consoleElement = document.getElementById("console")
let consoleWrapper = document.getElementById("consoleWrapper");
let queueList = document.getElementById("queueList");
ipcRenderer.on('updateConsole', (event, args) =>{
    const maxChars = 250000;
    consoleElement.innerHTML += args.data;
    consoleElement.innerHTML = consoleElement.innerHTML.substr(consoleElement.innerHTML.length - maxChars);
    consoleWrapper.scrollTop = consoleWrapper.scrollHeight;
})

ipcRenderer.on('updateQueue', (event, args) =>{
    queueList.innerHTML = args.data;
});

ipcRenderer.send('DTLoaded',{});