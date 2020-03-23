let fs = require('fs');
let getAppDataPath = require("appdata-path");
let DTWrapper = require("./DTWrapper.js");
let DTCmd = require('./DTCmd.js');
const {
    ipcMain
} = require('electron');
//const owpath = "C:/Program Files (x86)/Overwatch/_retail_";
const owpath = require('./settings.js').settings.owpath.path;
const dtpath = getAppDataPath("Yernemm/OWET2/datatool");
const outpath = getAppDataPath("Yernemm/OWET2/output/extracted");

const logFile = getAppDataPath("Yernemm/OWET2/output/logs") + `/log-${new Date().getTime()}.txt`;

const DTData = require('./DTData.js');
const DTUpdater = require('./DTUpdater.js');

console.log("ummm sonny");

///

var logStream;


logStream = fs.createWriteStream(logFile, {
    flags: 'a'
});

let dt;



ipcMain.on('runConsoleCmd', (event, args) => {
    dt.addToQueue(args.cmd, args.flags, args.args);
    dt.runQueue();
    event.sender.send('updateQueue', {
        data: queueHtml()
    });
});

ipcMain.on('DtOpenCurrentLog', (event, args)=>{
    let notepadCmd = require('child_process').spawn;
    notepadCmd('C:\\windows\\notepad.exe', [logFile]);
});

ipcMain.on('DtOpenOutputFolder', (event, args)=>{
    require('child_process')
    .exec(`start "" "${getAppDataPath("Yernemm/OWET2/output")}"`);
});


ipcMain.on('DTLoaded', (event, args) => {
    let dtu = new DTUpdater();
    dtu.update().then(() => {

        console.log("DT Loaded");
        dt = new DTWrapper(dtpath, owpath, outpath, (data) => {
            event.sender.send('updateConsole', {
                data: data
            });
            logStream.write(data);
        }, (o) => {
            event.sender.send('updateConsole', {
                data: `\n[OWET] Exited with code ${o.code}\n\n`
            });
            logStream.write(`\n[OWET] Exited with code ${o.code}\n\n`);
            event.sender.send('updateQueue', {
                data: queueHtml()
            });
        });

        let dtd = new DTData(dtpath, owpath);
        dtd.getInfo().then(json => {
            sendbtns({Keyword: 'help', Description: 'Help'});

            ['DumpFlags', 'ListFlags', 'ExtractFlags', 'ExtractMapEnvFlags']
            .forEach(item => {
                json.ToolGroups[item].Tools.forEach(tool => sendbtns(tool));
            })


            function sendbtns(tool) {

                event.sender.send('addBtn', {
                    cmd: tool.Keyword,
                    text: tool.Description
                });

            }
        });

    })
    .catch(err=>console.log("ERROR\n" + err));



});

ipcMain.on('removeQueue', (event, args) => {
    dt.removeFromQueue(args.id);
    event.sender.send('updateQueue', {
        data: queueHtml()
    });
});

function queueHtml() {
    let h = "";
    dt.cmdQueue.forEach((cmd, id) => {
        if (id == 0) {
            h += `<p>Running</p>`;
        }
        if (id == 1) {
            h += `<p>Queue</p>`;
        }
        h +=
            `       <div class='buttonContainerStatic buttonContainerQueue tooltip'>
                    <a class='button' onClick="removeQueue(${id})">${cmd.cmdName}</a>
                    <span class="tooltiptext">${cmd.cmd.split('& ')[1]}</span>
                </div>  
        `;
    });
    return h;
}

let SettingsManager = require('./SettingsManager.js');
let sm = new SettingsManager();
console.log(JSON.stringify(sm.createDefaults()));

ipcMain.on('settingsSave', (event, args)=>{
    sm.saveSettings(args)
    .then(()=>event.sender.send('settingsSaved', 'Settings saved. Restart OWET 2 to apply.'))
    .catch((err)=>event.sender.send('settingsSaved', err));
    
});

const packageJson = require('./../../package.json');
console.log(packageJson.version);
ipcMain.on('mainMenuLoaded', (event, args)=>{
    event.sender.send('mainMenuSetVersion', packageJson.version)   
});


function runAtMain() {

}

//logStream.end();

module.exports = {
    runAtMain
};