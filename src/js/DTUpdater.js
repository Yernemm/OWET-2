const Downloader = require('./Downloader.js');
const https = require('https');
class DTUpdater {
    //https://ci.appveyor.com/api/projects/yretenai/owlib/branch/master
    //https://ci.appveyor.com/api/buildjobs/[JOB-ID]/artifacts/dist%2Ftoolchain-release.zip
    DTUpdater() {

    }

    downloadDT() {
        console.log('piss n shit')
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
                    console.log(JSON.parse(d).build.jobs[0].jobId);
                });
            });

            req.on('error', error => {
                console.error(error);
            });

            req.end();
        });
        let jobId;
        let dtDown = new Downloader(`https://ci.appveyor.com/api/buildjobs/${jobId}/artifacts/dist%2Ftoolchain-release.zip`, 'toolchain.zip', 'temp');
    }
}

module.exports = DTUpdater;