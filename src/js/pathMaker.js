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
        "/Yernemm/OWET2/temp"
    ];

    paths.forEach(path => {
        let p = getAppDataPath(path);
        if(!fs.existsSync(p)){
            console.log(`Make ${p}...`);
            fs.mkdirSync(p);
        }
    });

}
module.exports = pathMaker;