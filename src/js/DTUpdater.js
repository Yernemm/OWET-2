const Downloader = require('./Downloader.js');
const https = require('https');
const unzipper = require('unzipper');
const getAppDataPath =require("appdata-path");
const fs = require('fs');
const { BrowserWindow, ipcMain } = require('electron');
class DTUpdater {
    //https://ci.appveyor.com/api/projects/yretenai/owlib/branch/master
    //https://ci.appveyor.com/api/buildjobs/[JOB-ID]/artifacts/dist%2Ftoolchain-release.zip
    DTUpdater() {

    }

    makeDtRequest() {
        return new Promise((reslove, reject) => {
            

            const options = {
                hostname: 'ci.appveyor.com',
                path: '/api/projects/yretenai/owlib/branch/master',
                method: 'GET'
            };

            const req = https.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`);

                res.setEncoding('utf8');

                res.once('data', d => reslove(d));

            });

            req.once('error', error => reject(error));
            
            req.end();

        });
    }

    downloadDT(percentageTick = p=>console.log(p)) {
        return new Promise((reslove, reject) => {

            this.makeDtRequest()
            .then(d=> {
                    
                let jobId = JSON.parse(d).build.jobs[0].jobId;
                let dtDown = new Downloader(`https://ci.appveyor.com/api/buildjobs/${jobId}/artifacts/dist%2Ftoolchain-release.zip`, 'toolchain.zip', '/datatool/');
                console.log(dtDown);
                dtDown.download((e)=>percentageTick(Math.floor(e*100) / 1))
                .then(()=>{
                    //unzip
                    console.log('unzip');
                    fs.writeFile(dtDown.path + "version.txt", JSON.parse(d).build.version, ()=>{});
                    fs.createReadStream(dtDown.filepath)
                    .pipe(unzipper.Extract({ path: dtDown.path }))
                    .on('close', reslove());
                });
            })
            .catch(err=>console.log(err));
            
          
        });
        }

    getLocalVersion(){
        return new Promise((resolve,reject)=>{
            fs.readFile(getAppDataPath('Yernemm/OWET2/datatool/version.txt'),{'encoding': 'utf8'},(err,data)=>{
                if(err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }

    getLatestVersion(){
        return new Promise((resolve, reject)=>{
            this.makeDtRequest().then(d=>{
                resolve(JSON.parse(d).build.version);
            })
            .catch(err=>reject(err));
        });
    }

    isLatestDownloaded(){
        return new Promise((resolve, reject)=>{
            this.getLocalVersion()
            .then(local => {
                this.getLatestVersion()
                .then(latest=>{
                    if(latest == local)
                        resolve(true);
                    else
                        resolve(false);
                })
                .catch(e=>reject(e));
            })
            .catch(e=> resolve(false)); //error reading file. Likely no file so not downloaded.
        });
    }

    update(){
        return new Promise((resolve,reject)=>{
            this.isLatestDownloaded()
            .then(latest=>{
                if(!latest){
                    console.log("Update found, downloading...");

                    const win = new BrowserWindow({
                        width: 600,
                        height: 300,
                        'minHeight': 300,
                        'minWidth': 600,
                        webPreferences: {
                          nodeIntegration: true
                        },
                        frame: false
                      });
                    
                      
                      // and load the index.html of the app.
                      win.loadFile('./src/html/downloader.html');
                      win.removeMenu();

                      ipcMain.on('downloader-ready', (event,args)=>{
                          event.sender.send('downloader-values', {name: "DataTool"});
                          this.downloadDT(tick=>event.sender.send('downloader-tick', tick))
                          .then(done=>resolve(done))
                          .catch(err=>reject(err))
                          .finally(()=>win.close());
                      });
                }else{
                    resolve();
                }
            })
            .catch(e=>reject(e));
        });
    }
}

module.exports = DTUpdater;