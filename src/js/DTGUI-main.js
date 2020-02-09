let fs = require('fs');
let getAppDataPath =require("appdata-path");
let DTWrapper =require("./DTWrapper.js");
let DTCmd =require('./DTCmd.js');
const { ipcMain } = require('electron')
const owpath = "C:/Program Files (x86)/Overwatch/_retail_";
const dtpath = getAppDataPath("Yernemm/OWET2/datatool");
const outpath = getAppDataPath("Yernemm/OWET2/extracted");

const logFile = getAppDataPath("Yernemm/OWET2/logs") + `/log-${new Date().getTime()}.txt`;

console.log("ummm sonny")

///

var logStream;


logStream = fs.createWriteStream(logFile, {flags:'a'});

let dt;



ipcMain.on('runConsoleCmd', (event, args) => {
    dt.addToQueue(args.cmd);
    dt.runQueue();
    event.sender.send('updateQueue', {data: queueHtml()});
});


ipcMain.on('DTLoaded', (event,args)=>{
    console.log("DT Loaded")
    dt = new DTWrapper(dtpath, owpath, outpath, (data)=>{
        event.sender.send('updateConsole', {data: data});
        logStream.write(data);
    }, (o) => {
        event.sender.send('updateConsole', {data: `\nExited with code ${o.code}\n\n`});
        logStream.write(`\nExited with code ${o.code}`);
        event.sender.send('updateQueue', {data: queueHtml()});
    });

})

function queueHtml(){
    let h = ""
    h += "<ol>"
    dt.cmdQueue.forEach(cmd=>{
        h+= `<li>${cmd.cmdName}</li>`
    })
    h+= "</ol>"
    return h;
}



function runAtMain(){

}

//logStream.end();

module.exports = {runAtMain};