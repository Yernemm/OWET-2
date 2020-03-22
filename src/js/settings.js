//wrapper for current settings json.
const getAppDataPath = require("appdata-path");
const settingsPath = getAppDataPath('/Yernemm/OWET2/settings1.json');
const SettingsManager = require('./SettingsManager.js');
let sm = new SettingsManager();
const settings = require(settingsPath);
module.exports = 
{
    settings: {...sm.createDefaults(), ...settings},
    path: settingsPath
}; //Combine defaults with actual settings.