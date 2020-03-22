const fs = require('fs');
const getAppDataPath = require("appdata-path");
function pathMaker(){
    const paths = [
        "/Yernemm",
        "/Yernemm/OWET2",
        "/Yernemm/OWET2/cache",
        "/Yernemm/OWET2/output",
        "/Yernemm/OWET2/output/logs",
        "/Yernemm/OWET2/output/extracted",
        "/Yernemm/OWET2/logs",
        "/Yernemm/OWET2/temp",
        "/Yernemm/OWET2/datatool"
    ];

    paths.forEach(path => {
        let p = getAppDataPath(path);
        if(!fs.existsSync(p)){
            console.log(`Make ${p}...`);
            fs.mkdirSync(p);
        }
    });

    //Temporarily copy toolinfo since datatool doesn't have it in the master branch.

    const tooInfoPath = getAppDataPath('/Yernemm/OWET2/cache/toolinfo.json');
    if(!fs.existsSync(tooInfoPath)){
        fs.copyFileSync('./toolinfo.json', tooInfoPath);
        console.log('Copied toolinfo.json');
    }

    //Create default settings.
    const settingsPath = getAppDataPath('/Yernemm/OWET2/settings1.json');
    if(!fs.existsSync(settingsPath)){
        const SettingsManager = require('./SettingsManager.js');
        let sm = new SettingsManager();
        fs.writeFileSync(settingsPath,JSON.stringify(sm.createDefaults()));
        console.log(`Wrote default settings ${settingsPath}`);
    }

}
module.exports = pathMaker;