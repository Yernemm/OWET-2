const getAppDataPath =require("appdata-path");
const fs = require('fs');
//https://ci.appveyor.com/api/projects/yretenai/owlib/branch/master
//https://ci.appveyor.com/api/buildjobs/[JOB-ID]/artifacts/dist%2Ftoolchain-release.zip
class Downloader
{
    constructor(url, name, relpath){
        this.url = url;
        this.name = name;
        this.path = getAppDataPath("Yernemm/OWET2" + relpath);
    }

    download(){

    }
}
module.exports = Downloader;