//wrapper for current settings json.
const fs = require('fs');
const getAppDataPath = require("appdata-path");
const settingsPath = getAppDataPath('/Yernemm/OWET2/settings1.json');
const SettingsManager = require('./SettingsManager.js');
let sm = new SettingsManager();
let settings = {};
if(fs.existsSync(settingsPath))
    settings = require(settingsPath);
module.exports = 
{
    settings: {...sm.createDefaults(), ...settings},
    path: settingsPath
}; //Combine defaults with actual settings.