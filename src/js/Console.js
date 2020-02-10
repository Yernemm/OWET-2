const { spawn } = require('child_process');
class Console {

    constructor() {

    }

    run(command, onData = (d) => console.log(d), onDone = (a) => {}, stackData = false) {
      console.log(command)
        const child = spawn(command, {shell: true});

    // use child.stdout.setEncoding('utf8'); if you want text chunks
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    let totalOut = '';
    child.stdout.on('data', (chunk) => {
      // data from standard output is here as buffers
      sendData(chunk);
    });

    child.stderr.on('data', (chunk) => {
      // data from standard output is here as buffers
      sendData(chunk);
    });

    function sendData(chunk) {
      totalOut += chunk;
      if(stackData)
      onData(totalOut);
      else
      onData(chunk);
      
      console.log(chunk)
    }

// since these are streams, you can pipe them elsewhere
//child.stderr.pipe(dest);

child.on('close', (code) => {
  onDone(code);
});
    }

}

module.exports = Console;