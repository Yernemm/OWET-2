const fs = require('fs');
let jsonFile = {'Error': 'error'};

function loadJson(){
    return new Promise((resolve, reject)=>{
        resolve(jsonFile);
    });
}

function parseHtml(){
    return new Promise((resolve, reject)=>{
        loadJson().then(json => resolve(generateHtml(json)));
    });
}

//This function takes the dynamic choices json and reformats it for use with this.
function preParseJson(){

}

function generateHtml(json){
    let html = '';

    //Heroes
    html += `<li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Heroes </span><span class="extractIcon buttonContainerSmall"><a class='button' onClick="cmdBtn('extract-unlocks', '*')">[ Extract All ]</a></span><hr />`;
    html += `<ul class="nested">`;
    json.Types["datatool.ux.valid_hero_names"].Choices.forEach(hero=>{
        html += `<li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> [${hero.QueryName}] ${hero.DisplayName} </span><span class="extractIcon buttonContainerSmall">
        <a class='button' onClick="cmdBtn('extract-unlocks', '${hero.QueryName}')">[ Extract All ]</a>
        </span><hr />`;
        html += `<ul class="nested">`;
            for(let type in hero.Children.Types){
                html += `<li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> ${displayDict(type)} </span><span class="extractIcon buttonContainerSmall">
                <a class='button' onClick="cmdBtn('extract-unlocks', '${hero.QueryName}|${/(?<=datatool.ux.valid_)(.*)(?=_names)/.exec(type)[0]}=*')">[ Extract All ]</a>
                </span><hr />`;
                html += `<ul class="nested">`;
                console.log(hero.DisplayName + " " + type);
                hero.Children.Types[type].Choices.forEach(choice=>{
                        html += `<li>${choice.DisplayName}<span class="extractIcon buttonContainerSmall">
                        <a class='button' onClick="cmdBtn('extract-unlocks', '${hero.QueryName}|${/(?<=datatool.ux.valid_)(.*)(?=_names)/.exec(type)[0]}=${choice.QueryName.replace(/'/g, `${"\\"}'`)}')">[ Extract ]</a>
                        </span></li><hr />`;
                    });
                html += `</ul>`;
            }
        html += `</ul>`;
    })
    html += `</ul>`;

    //NPCs
    html += `<li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> NPCs </span><span class="extractIcon buttonContainerSmall">
    <a class='button' onClick="cmdBtn('extract-npcs', '*')">[ Extract All ]</a>
    </span><hr />`;
    html += `<ul class="nested">`;
    json.Types["datatool.ux.valid_npc_names"].Choices.forEach(npc=>{
        html += `<li>[${npc.QueryName}] ${npc.DisplayName}<span class="extractIcon buttonContainerSmall">
        <a class='button' onClick="cmdBtn('extract-npcs', '${npc.QueryName}')">[ Extract ]</a>
        </span><hr /></li>`;
    });
    html += `</ul>`;

    //Maps
    html += `<li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Maps </span><span class="extractIcon buttonContainerSmall">
    <a class='button' onClick="cmdBtn('extract-maps', '*')">[ Extract All ]</a>
     </span><hr />`;
    html += `<ul class="nested">`;
    json.Types["datatool.ux.valid_map_names"].Choices.forEach(map=>{
        html += `<li>[${map.QueryName}] ${map.DisplayName} <span class="extractIcon buttonContainerSmall">
        <a class='button' onClick="cmdBtn('extract-maps', '${map.QueryName}')">[ Extract ]</a>
        </span><hr /></li>`;
    });
    html += `</ul>`;


    return html;
}

function recursivelyParseHtml(json){
    console.log(json);
}

function setHtml(){
    console.log("uh");
    parseHtml().then(html=>{
        document.getElementById('selectorList').innerHTML = html;

        clickyMenuItems();
    }) 
}



function displayDict(text){
    return displayDictList[text] === undefined ? text : displayDictList[text];
}

const displayDictList = {
    "datatool.ux.valid_hero_names": "Heroes",
    "datatool.ux.valid_icon_names": "Icons",
    "datatool.ux.valid_emote_names": "Emotes",
    "datatool.ux.valid_victorypose_names": "Victory Poses",
    "datatool.ux.valid_highlightintro_names": "Highlight Intros",
    "datatool.ux.valid_voiceline_names": "Voice Lines",
    "datatool.ux.valid_skin_names": "Skins",
    "datatool.ux.valid_spray_names": "Sprays",
    "datatool.ux.valid_weaponskin_names": "Weapon Skins",
    "datatool.ux.valid_npc_names": "NPCs",
    "datatool.ux.valid_owl_teams": "Overwatch League Teams",
    "datatool.ux.valid_map_names": "Maps"
}

const displayDictListforCmd = {
    "datatool.ux.valid_icon_names": "icon",
    "datatool.ux.valid_emote_names": "emote",
    "datatool.ux.valid_victorypose_names": "victorypose",
    "datatool.ux.valid_highlightintro_names": "Highlight Intros",
    "datatool.ux.valid_voiceline_names": "Voice Lines",
    "datatool.ux.valid_skin_names": "Skins",
    "datatool.ux.valid_spray_names": "Sprays",
    "datatool.ux.valid_weaponskin_names": "Weapon Skins",
    "datatool.ux.valid_npc_names": "NPCs",
    "datatool.ux.valid_owl_teams": "Overwatch League Teams",
    "datatool.ux.valid_map_names": "Maps"
}


ipcRenderer.send('WizardNeedJSON',{});

ipcRenderer.on('WizardSendingJSON', (event, args) =>{

    jsonFile = args;
    setHtml();



});

function clickyMenuItems(){
        //Set the js for clicking on the menu options

        let toggler = document.getElementsByClassName("caret");
        let i;
        
        for (i = 0; i < toggler.length; i++) {
          toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
          });
        }
}
