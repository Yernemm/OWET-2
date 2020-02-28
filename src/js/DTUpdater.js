const Downloader = require('./Downloader.js');
class DTUpdater
{
    //https://ci.appveyor.com/api/projects/yretenai/owlib/branch/master
//https://ci.appveyor.com/api/buildjobs/[JOB-ID]/artifacts/dist%2Ftoolchain-release.zip
    DTUpdater(){

    }

    downloadDT(){
        let jobId;
        let dtDown = new Downloader(`https://ci.appveyor.com/api/buildjobs/${jobId}/artifacts/dist%2Ftoolchain-release.zip`,'toolchain.zip','temp');
    }
}

module.exports = DTUpdater;