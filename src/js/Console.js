const { spawn } = require('child_process');
class Console {

    constructor() {

    }

    run(callback) {
        const child = spawn('cd "C:\\Users\\barte\\OneDrive\\Documents\\GitHub\\OWET-2\\datatool" & DataTool.exe', {shell: true});

// use child.stdout.setEncoding('utf8'); if you want text chunks
child.stdout.setEncoding('utf8');
let totalOut = '';
child.stdout.on('data', (chunk) => {
  // data from standard output is here as buffers
  console.log(chunk)
  totalOut += chunk + `<br />`
  callback(totalOut);
  
});

// since these are streams, you can pipe them elsewhere
//child.stderr.pipe(dest);

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
    }

}

module.exports = Console;