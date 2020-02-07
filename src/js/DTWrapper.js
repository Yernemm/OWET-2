import DTCmd from './DTCmd.js';
import Console from './Console.js';

class DTWrapper {
    constructor(dtPath, owPath)
    {
        this.cmdQueue = [];
        this.dtPath = dtPath;
        this.owPath = owPath;
    }

    addToQueue(cmd){
        this.cmdQueue.push(cmd);
    }

    runQueue(){
        let cmd = this.cmdQueue.shift(); 
        cmd.run().then(obj => {
            if(this.cmdQueue.length > 0)
                this.runQueue();
        })
    }



}

export default DTWrapper;