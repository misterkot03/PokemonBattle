
const mainHero = {
    name:'Squirtle',
    defaultHP: 100,
    damageHP:100,
    elHP:document.getElementById('health-character'),
    elProgressBar:document.getElementById('progressbar-character'),

}
const enemyHero = {
    name:'Charmander',
    defaultHP: 100,
    damageHP:100,
    elHP:document.getElementById('health-enemy'),
    elProgressBar:document.getElementById('progressbar-enemy'),
}


function init() {
    renderHP(mainHero);
    renderHP(enemyHero);
}
function  renderHP(person){
    console.log(person.name+": "+person.elHP);
}

init();
