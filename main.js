import {random,countBtn,generateLog,randomInteger} from  "./utils.js";
import Pokemon from "./pokemon.js";
import  {pokemons} from "./pokemons.js";
const control = document.querySelector('.control');

class Game {

    start = async () =>{

        const pokemonPlayer = this.getPockemon();

        const pokemonRobot = this.getPockemon();


        let player1 =  this.initPlayer(pokemonPlayer,'player1');
        let player2 = this.initPlayer(pokemonRobot,'player2');

        this.initBtn(player1,player2);
    }
    getPockemon() {
        return pokemons[randomInteger(0, 5)];
    }
    initBtnStart() {
        const $start = document.getElementById('start');
        $start.addEventListener('click',()=>{
            const allButtons = document.querySelectorAll('.control .button');
            allButtons.forEach($item => $item.remove());
            this.start();
        })
    }
    gameOver() {
        const allButtons = document.querySelectorAll('.control .button');
        allButtons.forEach($item => $item.remove());

        const btn = document.createElement('button');
        btn.classList.add('button');
        btn.innerText ="New Game";
        btn.id ='start';
        control.appendChild(btn);
        this.initBtnStart();
    }



    initBtn(player1,player2) {
        const thisGame = this;
        player1.attacks.forEach(item=>{
            const btn = document.createElement('button');
            btn.classList.add('button');
            btn.setAttribute('maxDamage',item.maxDamage)
            btn.setAttribute('minDamage',item.minDamage)
            btn.innerText = item.name;
            const btnCount = countBtn(item.maxCount,btn);
            btn.addEventListener('click', async () => {

                btnCount();
                const kickPlayer1 = random(item.maxDamage,item.minDamage);
                player2.changeHP(kickPlayer1,function (count) {
                    thisGame.printLogs(generateLog(player1,player2,count))
                });
                if (player2.hp.current == 0){

                    const pokemon = this.getPockemon();
                    player2 = this.initPlayer(pokemon,'player2');
                }

                const attackPlayer2 = player2.attacks[randomInteger(0, 3)];
                const kickPlayer2 = random( attackPlayer2.maxDamage, attackPlayer2.minDamage); // TODO брать из атаки врага
                player1.changeHP(kickPlayer2,function (count) {
                    thisGame.printLogs(generateLog(player2,player1,count))
                });
                if (player1.hp.current == 0){
                    this.gameOver();
                }
            });
            control.appendChild(btn);


        })
    }
    printLogs(text){
        const p = document.createElement('p');
        p.innerText = text;
        const  divLogs = document.querySelector('#logs');
        divLogs.childElementCount ===0 ? divLogs.appendChild(p) : divLogs.insertBefore(p,divLogs.children[0]);
    }
    initPlayer(player,selector) {
        return  new Pokemon({
            ...player,
            selectors:selector,
        });
    }


}
const newGame = new Game();
newGame.initBtnStart();