const fs = require('fs');
const jsonFile = require("./../../temp/dynamicChoices.json");

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
    html += `<li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Heroes <span class="extractIcon"><a class='button' onClick="cmdBtn('extract-unlocks', '*')">[ Extract All ]</a></span></span><hr />`;
    html += `<ul class="nested">`;
    json.Types["datatool.ux.valid_hero_names"].Choices.forEach(hero=>{
        html += `<li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> ${hero.DisplayName} <span class="extractIcon">[ Extract All ]</span></span><hr />`;
        html += `<ul class="nested">`;
            for(let type in hero.Children.Types){
                html += `<li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> ${displayDict(type)} <span class="extractIcon">[ Extract All ]</span></span><hr />`;
                html += `<ul class="nested">`;
                console.log(hero.DisplayName + " " + type);
                hero.Children.Types[type].Choices.forEach(choice=>{
                        html += `<li>${choice.DisplayName}<span class="extractIcon">[ Extract ]</span></li><hr />`;
                    });
                html += `</ul>`;
            }
        html += `</ul>`;
    })
    html += `</ul>`;

    //NPCs
    html += `<li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> NPCs </span><hr />`;
    html += `<ul class="nested">`;
    json.Types["datatool.ux.valid_npc_names"].Choices.forEach(npc=>{
        html += `<li>[${npc.QueryName}] ${npc.DisplayName}<hr /></li>`;
    });
    html += `</ul>`;

    //Maps
    html += `<li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Maps </span><hr />`;
    html += `<ul class="nested">`;
    json.Types["datatool.ux.valid_map_names"].Choices.forEach(map=>{
        html += `<li>[${map.QueryName}] ${map.DisplayName}<hr /></li>`;
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
    }) 
}

setHtml();

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

/*
example

 <li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Heroes <div class='buttonContainerSmall extractBtn'><a class='button' >Extract All</a></div></span>
                  <ul class="nested">
                    <li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Ana <div class='buttonContainerSmall extractBtn'><a class='button' >Extract All</a></div></span></li>
                    <li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Brigitte <div class='buttonContainerSmall extractBtn'><a class='button' >Extract All</a></div></span>
                      <ul class="nested">
                        <li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Abilities <div class='buttonContainerSmall extractBtn'><a class='button' >Extract All</a></div></span></li>
                        <li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Emotes <div class='buttonContainerSmall extractBtn'><a class='button' >Extract All</a></div></span></li>
                        <li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Skins  <div class='buttonContainerSmall extractBtn'><a class='button' >Extract All</a></div></span>
                          <ul class="nested">
                            <li>Classic <div class='buttonContainerSmall extractBtn'><a class='button' >Extract</a></div></li>
                            <li>Carbon Fiber <div class='buttonContainerSmall extractBtn'><a class='button' >Extract</a></div></li>
                            <li>Ironclad <div class='buttonContainerSmall extractBtn'><a class='button' >Extract</a></div></li>
                            <li>Riot Police <div class='buttonContainerSmall extractBtn'><a class='button' >Extract</a></div></li>
                          </ul>
                        </li>
                        <li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Sprays</span></li>
                        <li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Voice lines</span></li>
                      </ul>
                    </li>  
                  </ul>
                  <li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Maps</span></li>
                    <li><span class="caret"><img src='./../img/arrow.png' class="arrowImg" /> Other</span></li>
                </li>
*/