const opts = require('./settings.json');
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
}
module.exports = SettingsManager;