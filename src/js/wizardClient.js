const { ipcRenderer } = require('electron');
function cmdBtn(cmd, args) {
    console.log('runnin');
    ipcRenderer.send('runConsoleCmd', {
        cmd: cmd, 
        flags: "",
        args: `"${args}"` 
    });
    

}

let consoleElement = document.getElementById("console");
let queueList = document.getElementById("queueList");

let consoleText = '';
const scrollRate = 5;
let changed = false;
ipcRenderer.on('updateConsole', (event, args) =>{
    const maxChars =150000;
    consoleText+= args.data;
    consoleText = consoleText.substr(consoleText.length - maxChars);
    consoleElement.textContent = consoleText;
    changed = true;
})

setInterval(()=>{
    if(changed) {
        consoleElement.scrollTop = consoleElement.scrollHeight;
        changed = false;
    }
}
,1000 / scrollRate)

ipcRenderer.on('updateQueue', (event, args) =>{
    queueList.innerHTML = args.data;
    if(args.data.length < 1){
        ipcRenderer.send('flashWindow', {});
    }
});

function removeQueue(id){
    ipcRenderer.send('removeQueue', {id});
}

ipcRenderer.send('DTLoaded',{});