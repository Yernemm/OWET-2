const Console =require('./Console.js');
/**
 * A single DT Command.
 */
class DTCmd {

    constructor(fullCmd, cmdName) {
        this.cmd = fullCmd;
        this.cmdName = cmdName;
    }

    run(onData = ()=>{}) {
        return new Promise((resolve, reject) => {
            let c = new Console();
            let dataCount = '';
            function onDataPass(data) {
                dataCount = data;
                onData(dataCount);
            }
            //TO-DO: reject promise if console has an error.
            c.run(this.cmd,onDataPass,(code)=>{resolve({code, dataCount})})
        })
    }

}

module.exports = DTCmd;