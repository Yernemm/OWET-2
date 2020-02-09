let DTCmd =require('./DTCmd.js');
class DTWrapper {
    constructor(dtPath, owPath, consoleUpdate, done)
    {
        this.cmdQueue = [];
        this.dtPath = dtPath;
        this.owPath = owPath;
        this.consoleUpdate = consoleUpdate;
        this.done = done;
    }

    addToQueue(cmd){
        let fullcmd = "cd \"" + this.dtPath + "\" & datatool \"" + this.owPath + "\" " + cmd;
        this.cmdQueue.push(new DTCmd(fullcmd));
    }

    runQueue(){
        let cmd = this.cmdQueue.shift(); 
        cmd.run(this.consoleUpdate).then(obj => {
            this.done(obj);
            if(this.cmdQueue.length > 0)
                this.runQueue();
        })
    }



}

module.exports = DTWrapper;