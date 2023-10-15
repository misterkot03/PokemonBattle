class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressBar =document.getElementById(`progressbar-${name}`);
    }

}
class  Pokemon extends Selectors{
    constructor({name,hp,selectors,attacks=[],img}) {
        super(selectors);


        this.name = name;
        this.hp = {
            current:hp,
            total:hp,
        };
        this.img = img;
        this.attacks = attacks;
        this.renderHP();
        this.renderIMG(selectors);
        this.renderName(selectors);

    }
    renderName = (player) =>{
        const $elName = document.getElementById(`name-${player}`);
        $elName.innerText = this.name;
    }
    renderIMG = (player) =>{
        const $elImg = document.getElementById(`img-${player}`);
        console.log( this.img,player)
        $elImg.src = this.img;
    }
    changeHP =(count,cb) => {

        if (this.hp.current <= count){
            this.hp.current =0;
        }else{
            this.hp.current -=count;
        }

        this.renderHP();
        cb && cb(count);
    }
    renderHP = () =>{
        this.renderHPLife();
        this.renderProgressbarHP();
    }
    renderHPLife = () =>{
        const  {elHP,hp:{current,total}}=this;
        elHP.innerText = current + ' / ' +total;
    }
    renderProgressbarHP = () => {
        const {elProgressBar,hp:{current,total}} = this;
        const procent = current/(total/100);
        elProgressBar.style.width =procent + '%';
        if (procent<50 && procent>20){
            elProgressBar.classList.add('low');
        }else if(procent<20){
            elProgressBar.classList.add('critical');
        }else {
            elProgressBar.classList.remove('critical');
            elProgressBar.classList.remove('low');
        }

    }

}
export  default  Pokemon;