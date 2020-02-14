const Console = require('./Console.js');
class DTData {
    
    constructor(dtPath, owPath)
    {
        this.dtPath = dtPath;
        this.owPath = owPath;
    }

    generateToolInfo() {
        let c = new Console();
        let cmd = `cd "${this.dtPath}" & datatool util-tool-info`
        let data = ''
        c.run(cmd,(out,err)
        => {data+= err},
        done()
        )
        function done(){
            
        }
    }
}

module.exports = DTData;