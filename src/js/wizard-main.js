let getAppDataPath = require("appdata-path");
const owpath = require('./settings.js').settings.owpath.path;
const dtpath = getAppDataPath("Yernemm/OWET2/datatool");
const outpath = getAppDataPath("Yernemm/OWET2/output/extracted");

const {
    ipcMain
} = require('electron');
const DTDataC = require('./DTDataChoices.js');

function runAtMain() {

}

ipcMain.on('WizardNeedJSON', (event, args)=>{

    let dtd = new DTDataC(dtpath, owpath);
    dtd.getInfo().then(json => {
        event.sender.send('WizardSendingJSON', json);
    });

      
});

module.exports = { runAtMain };
