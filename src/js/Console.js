const { spawn } = require('child_process');
class Console {

    constructor() {
      this.child;
    }

    run(command, onData = (out, err) => console.log(d), onDone = (a) => {}, stackData = false) {
      console.log(command)
        this.child = spawn(command, {shell: true});
        let child = this.child;

    // use child.stdout.setEncoding('utf8'); if you want text chunks
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    let totalOut = '';
    child.stdout.on('data', (chunk) => {
      // data from standard output is here as buffers
      sendData(chunk, false);
    });

    child.stderr.on('data', (chunk) => {
      // data from standard output is here as buffers
      sendData(chunk, true);
    });

    function sendData(chunk, isErr) {
      totalOut += chunk;
      if(isErr){
        if(stackData)
        onData(null,totalOut);
        else
        onData(null,chunk);
      }else{
        if(stackData)
        onData(totalOut,null);
        else
        onData(chunk,null);
      }

      
      //console.log(chunk)
    }

// since these are streams, you can pipe them elsewhere
//child.stderr.pipe(dest);

child.on('close', (code) => {
  onDone(code);
});
    }

    kill(){
      this.child.kill("SIGINT");
    }

}

module.exports = Console;