let fs = require('fs');
let getAppDataPath =require("appdata-path");
let DTWrapper =require("./DTWrapper.js");
let DTCmd =require('./DTCmd.js');
const { ipcMain } = require('electron')
const owpath = "C:/Program Files (x86)/Overwatch/_retail_";
const dtpath = getAppDataPath("Yernemm/OWET2/datatool");

const logFile = getAppDataPath("Yernemm/OWET2/logs") + `/log-${new Date().getTime()}.txt`;

console.log("ummm sonny")

///

var logStream;


var consoleFull = "";

var consoleData = "";
var consoleDataLast = "";

ipcMain.on('runConsoleCmd', (event, args) => {
    logStream = fs.createWriteStream(logFile, {flags:'a'});
    let dt = new DTWrapper(dtpath, owpath, (data)=>{
        consoleFull = data; 
        event.sender.send('updateConsole', {data: data});
        logStream.write(data);
    }, (o) => {
        consoleFull += `\nExited with code ${o.code}`
        logStream.end();
    });
    dt.addToQueue(args.cmd);
    dt.runQueue();
});

function trimConsole(){
    const max = 100000;
    if(consoleFull.length > max){
        consoleData = consoleFull.substr(consoleFull.length - max);
    }else{
        consoleData = consoleFull;
    }
}

ipcMain.on('DTLoaded', (event,args)=>{
    setInterval(()=>{
        trimConsole();
        if(consoleData != consoleDataLast){
            //event.sender.send('updateConsole', {data: consoleData});
            consoleDataLast = consoleData;
        }
        
    },25);
})




function runAtMain(){




//document.getElementById("console").innerHTML = data

/*
window.setInterval(()=>{
    //document.getElementById('console').innerHTML = consoleData;
}, 1000);
*/
}



module.exports = {runAtMain};