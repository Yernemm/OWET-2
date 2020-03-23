//Run client-side.
const { ipcRenderer } = require('electron');
function cmdBtn(cmd) {
    console.log('runnin')
    ipcRenderer.send('runConsoleCmd', {
        cmd: cmd, 
        flags: document.getElementById('flagsBox').value,
        args: document.getElementById('argumentsBox').value 
    });
    

}
let consoleElement = document.getElementById("console");
let consoleWrapper = document.getElementById("consoleWrapper");
let queueList = document.getElementById("queueList");
let btnContainer = document.getElementById('btnContainer');
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

ipcRenderer.on('addBtn', (event, args)=> {
    let btnDiv = document.createElement('div');
    btnDiv.className = 'buttonContainerStatic';

    let btnAnchor = document.createElement('a');
    btnAnchor.className = 'button';
    btnAnchor.addEventListener('click', ()=>cmdBtn(args.cmd));
    btnAnchor.innerHTML = args.text;

    btnDiv.appendChild(btnAnchor);

    btnContainer.appendChild(btnDiv);


})

function removeQueue(id){
    ipcRenderer.send('removeQueue', {id});
}

ipcRenderer.send('DTLoaded',{});