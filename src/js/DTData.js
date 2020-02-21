const Console = require('./Console.js');
class DTData {

    constructor(dtPath, owPath) {
        this.dtPath = dtPath;
        this.owPath = owPath;
    }

    generateToolInfo() {
        return new Promise((resolve, reject) => {

            let c = new Console();
            let cmd = `cd "${this.dtPath}" & datatool "${this.owPath}" util-tool-info`
            let data = ''
            let i = 0;
            c.run(cmd, (out, err) => {
                    data += err ? err : ""
                },
                (code) => {
                    resolve(JSON.parse(data))
                }
            )


        })
    }
}

module.exports = DTData;