const Console = require('./Console.js');
/**
 * A single DT Command.
 */
class DTCmd {

    constructor(fullCmd, cmdName) {
        this.cmd = fullCmd;
        this.cmdName = cmdName;
        this.console = new Console();
    }

    run(onData = () => {}) {

        return new Promise((resolve, reject) => {
            let dataCount = '';

            function onDataPass(out, err) {
                let data = out ? out : err;
                dataCount = data;
                onData(dataCount);
            }
            //TO-DO: reject promise if console has an error.
            this.console.run(this.cmd, onDataPass, (code) => {
                resolve({
                    code,
                    dataCount
                })
            })
        })
    }

    kill() {
        this.console.kill()
    }

}

module.exports = DTCmd;