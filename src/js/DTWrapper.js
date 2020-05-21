let DTCmd =require('./DTCmd.js');
class DTWrapper {
    constructor(dtPath, owPath, outPath, consoleUpdate, done)
    {
        this.cmdQueue = [];
        this.dtPath = dtPath;
        this.owPath = owPath;
        this.outPath = outPath;
        this.consoleUpdate = consoleUpdate;
        this.done = done;
        this.queueRunning = false;
    }

    addToQueue(cmd, flags, args){
        let fullcmd = this.dtPath.split(':')[0] + ": & ";
        if(cmd == 'help')
            fullcmd += "cd \"" + this.dtPath + "\" & datatool help";
        else
            fullcmd += "cd \"" + this.dtPath + `" & datatool ${flags} "` + this.owPath + "\" " + cmd + ` "${this.outPath}" ${args}`;
        this.cmdQueue.push(new DTCmd(fullcmd, cmd, args));
    }

    removeFromQueue(id){

        if(id == 0)
            this.cmdQueue[0].kill();
        this.cmdQueue.splice(id,1);

    }

    runQueue(){
        if(!this.queueRunning && this.cmdQueue.length > 0){
            this.queueRunning = true;
            let cmd = this.cmdQueue[0];
            cmd.run(this.consoleUpdate).then(obj => {
                this.cmdQueue.shift();
                this.done(obj);
                this.queueRunning = false;
                if(this.cmdQueue.length > 0)
                    this.runQueue();
            });
        }
    }
    



}

module.exports = DTWrapper;