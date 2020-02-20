let fs = require('fs');
let getAppDataPath =require("appdata-path");
let DTWrapper =require("./DTWrapper.js");
let DTCmd =require('./DTCmd.js');
const { ipcMain } = require('electron')
const owpath = "C:/Program Files (x86)/Overwatch/_retail_";
const dtpath = getAppDataPath("Yernemm/OWET2/datatool");
const outpath = getAppDataPath("Yernemm/OWET2/extracted");

const logFile = getAppDataPath("Yernemm/OWET2/logs") + `/log-${new Date().getTime()}.txt`;

const DTData = require('./DTData.js');

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

    let dtd = new DTData(dtpath, owpath);
    dtd.generateToolInfo().then(json => {
        ['DumpFlags','ListFlags','ExtractFlags','ExtractMapEnvFlags']
        .forEach(item=>{
            json.ToolGroups[item].Tools.forEach(tool=>sendbtns(tool));
        })
        

      function sendbtns(tool){
        
            event.sender.send('addBtn', {
                cmd: tool.Keyword,
                text: tool.Description
            })
        
      }
    })


})

ipcMain.on('removeQueue', (event,args)=>{
    dt.removeFromQueue(args.id);
    event.sender.send('updateQueue', {data: queueHtml()});
});

function queueHtml(){
    let h = ""
    dt.cmdQueue.forEach((cmd,id)=>{
        if(id==0){
            h+= `<p>Running</p>`
        }
        if(id==1){
            h+= `<p>Queue</p>`
        }
        h+=
        `       <div class='buttonContainerStatic buttonContainerQueue'>
                    <a class='button' onClick="removeQueue(${id})">${cmd.cmdName}</a>
                </div>  
        `
    })
    return h;
}



function runAtMain(){

}

//logStream.end();

module.exports = {runAtMain};