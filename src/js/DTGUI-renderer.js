const { ipcRenderer } = require('electron');
function stringsBtn() {
    console.log('runnin')
    ipcRenderer.send('runConsoleCmd', {cmd: "dump-strings"})
    

}
ipcRenderer.on('updateConsole', (event, args) =>{
    let consoleElement = document.getElementById("console")
    let consoleWrapper = document.getElementById("consoleWrapper");
    consoleElement.innerHTML += args.data;
    consoleWrapper.scrollTop = consoleWrapper.scrollHeight;
})

ipcRenderer.send('DTLoaded',{});