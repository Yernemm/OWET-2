const getAppDataPath =require("appdata-path");
const fs = require('fs');
const request = require('request');

class Downloader
{
    constructor(url, name, relpath){
        this.url = url;
        this.name = name;
        this.path = getAppDataPath("Yernemm/OWET2" + relpath);
        this.filepath = this.path + this.name;
    }

    download(progressTick = () => {}){
        return new Promise((resolve, reject) => {
            let req = request({
                method: 'GET',
                uri: this.url
            });

            req.pipe(fs.createWriteStream(this.filepath));

            let totalsize = 1;
            let remainingsize = 0;

            req.on( 'response', (data) => {
               totalsize = data.headers[ 'content-length' ];
            });

            req.on('data', (chunk) => {
                remainingsize += chunk.length;
                progressTick(remainingsize / totalsize);
            });
            

            req.on('end', ()=>{
                resolve();
            });

        });
    }
}
module.exports = Downloader;