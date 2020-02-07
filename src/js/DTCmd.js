import Console from './Console.js';
/**
 * A single DT Command.
 */
class DTCmd {

    constructor(cmd) {
        this.cmd = cmd;
    }

    run(onData = ()=>{}) {
        return new Promise((resolve, reject) => {
            let c = new Console();
            let dataCount = '';
            function onDataPass(data) {
                dataCount = data;
                onData(data);
            }
            //TO-DO: reject promise if console has an error.
            c.run(this.cmd,onDataPass(data),(code)=>{resolve({code, dataCount})})
        })
    }

}

module.exports = DTCmd;