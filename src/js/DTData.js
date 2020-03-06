const Console = require('./Console.js');
const fs = require("fs");
const getAppDataPath = require("appdata-path");

class DTData {

    constructor(dtPath, owPath) {
        this.dtPath = dtPath;
        this.owPath = owPath;
    }

    generateToolInfo() {
        return new Promise((resolve, reject) => {

            let c = new Console();
            let cmd = `cd "${this.dtPath}" & datatool "${this.owPath}" util-tool-info`;
            let data = '';
            let i = 0;
            c.run(cmd, (out, err) => {
                    data += err ? err : "";
                },
                (code) => {
                    resolve(JSON.parse(data));
                }
            );


        });
    }

    generateAndCache() {
        return new Promise((resolve, reject) => {
            this.generateToolInfo().then(data => {
                fs.writeFile(getAppDataPath("Yernemm/OWET2/cache/") + "toolinfo.json", JSON.stringify(data), resolve);
            });
        });
    }

    getFromCache() {
        return new Promise((resolve, reject) => {
            fs.readFile(getAppDataPath("Yernemm/OWET2/cache/") + "toolinfo.json", 'utf8', (err, data) => {
                if (data)
                    resolve(JSON.parse(data));
                else
                    reject(err);

            });
        });
    }

    getInfo() {
        return new Promise((resolve, reject) => {
            this.getFromCache()
                .then(data => resolve(data)) //return cached info.
                .catch((err) => {
                    //cannot read cached data
                    console.log(err);
                    this.generateToolInfo()
                        .then(data => resolve(data))
                        .catch(err => reject(err));
                    this.generateAndCache(); //cache if not cached.
                });
        });
    }


}

module.exports = DTData;