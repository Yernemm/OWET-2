const Downloader = require('./Downloader.js');
const https = require('https');
const unzipper = require('unzipper');
class DTUpdater {
    //https://ci.appveyor.com/api/projects/yretenai/owlib/branch/master
    //https://ci.appveyor.com/api/buildjobs/[JOB-ID]/artifacts/dist%2Ftoolchain-release.zip
    DTUpdater() {

    }

    downloadDT() {
        return new Promise((reslove, reject) => {
            
            const options = {
                hostname: 'ci.appveyor.com',
                path: '/api/projects/yretenai/owlib/branch/master',
                method: 'GET'
            };

            const req = https.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`);

                res.setEncoding('utf8');

                res.once('data', d => {
                    
                    let jobId = JSON.parse(d).build.jobs[0].jobId;
                    let dtDown = new Downloader(`https://ci.appveyor.com/api/buildjobs/${jobId}/artifacts/dist%2Ftoolchain-release.zip`, 'toolchain.zip', '/temp/');
                    console.log(dtDown);
                    dtDown.download((e)=>console.log(Math.floor(e*100) / 1 + "%"))
                    .then(()=>{
                        //unzip
                        console.log('unzip');
                        fs.createReadStream(dtDown.filepath)
                        .pipe(unzipper.Extract({ path: dtDown.path }));
                    });
                });
            });

            req.on('error', error => {
                console.error(error);
            });

            req.end();
        });
        }
}

module.exports = DTUpdater;