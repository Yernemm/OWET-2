const opts = require('./settings-simple.json');
const fs = require('fs');
class SettingsManager {
    constructor(){
      
    }

    createDefaults(){
        let defs = {};
        for(let set in opts.settings){
            let vals = [];
            for(let val in opts.settings[set].values){
                if(opts.settings[set].values[val].default === true){
                    vals.push({'value': opts.settings[set].values[val].name});
                }else if(opts.settings[set].values[val].default !== undefined){
                    let temp = {};
                    temp[opts.settings[set].values[val].name] = opts.settings[set].values[val].default;
                    vals.push(temp);
                }
            }
            if(vals.length === 0)
                vals = undefined;
            else if(vals.length === 1)
                vals = vals[0];

            if(vals)
            defs[set] = vals;
        }
        return defs;
    }

    createHtml(){
        let html = '';
        for(let sett in opts.settings){
            let set = opts.settings[sett];

            html+=`<div id='${sett}'`;

                html+=`<p><b>${set.title}</b><br>${set.desc}</p><form>`

                switch (set.type) {
                    case 'text':

                    set.values.forEach(val => {
                        html+=`${val.desc}<br><label for="${sett}-${val.name}">${val.title}:</label>
                    <input id="${sett}-${val.name}" type="text" /><br>`
                    });
                        
                        break;
                
                    default:
                        break;
                }

                html+='</form>';

            html+='<hr></div>';     
        }
        return html;
    }

    saveSettings(data){
        return new Promise((resolve,reject)=>{
            let settings = {...this.createDefaults(), ...data};

            fs.writeFile(require('./settings.js').path, JSON.stringify(settings), (err) => {
                if(err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
}
module.exports = SettingsManager;