/*skore*/
let skore = JSON.parse(localStorage.getItem('skore'));

if (skore === null) {
    skore = {vyhry: 0, prohry: 0, remizy: 0 };
}

/*reset skore*/
function reset() {
    document.querySelector('.vysledek').style.backgroundColor = 'white';
    skore.vyhry = 0;
    skore.prohry = 0;
    skore.remizy = 0;
    localStorage.removeItem('skore');
    skoreDisplay();
}

skoreDisplay();


/*vyber tahu pocitace, nahodne*/
function pickPCmove() { 
    const random = Math.random();
    let pcMove = "";

    if (random >= 0 && random < 1/3) {
        pcMove = 'kamen';
    } else if (random >= 1/3 && random < 2/3) {
        pcMove = 'nuzky';
    } else if (random >= 2/3 && random < 1) {
        pcMove = 'papir';
    }

    return pcMove;
}


/* urceni vyhry/prohry */
function playGame(playerMove) {
    const pcMove = pickPCmove()
    let result = '';

    if (playerMove === 'kamen') {  /*kdyz hrac zvoli kamen*/
        if (pcMove === 'kamen') {
            result = 'remiza';
        } else if (pcMove === 'nuzky') {
            result = 'vyhra';
        } else if (pcMove === 'papir') {
            result = 'prohra';
        }
    } else if (playerMove === 'nuzky') {  /*kdyz hrac zvoli nuzky*/
        if (pcMove === 'kamen') {
            result = 'prohra';
        } else if (pcMove === 'nuzky') {
            result = 'remiza';
        } else if (pcMove === 'papir') {
            result = 'vyhra';
        }
    } else if (playerMove === 'papir') {  /*kdyz hrac zvoli papir*/
        if (pcMove === 'kamen') {
            result = 'vyhra';
        } else if (pcMove === 'nuzky') {
            result = 'prohra';
        } else if (pcMove === 'papir') {
            result = 'remiza';
        }
    }


    /*aktualizace skore*/
    if (result === 'vyhra') {
        skore.vyhry += 1;
        document.querySelector('.vysledek').style.backgroundColor = '#00BB34';
    } else if (result === 'prohra') {
        skore.prohry += 1;
        document.querySelector('.vysledek').style.backgroundColor = '#8F0000';
    } else if (result === 'remiza') {
        skore.remizy += 1;
        document.querySelector('.vysledek').style.backgroundColor = '#003566';
    }
    
    /*ulozeni skore*/
    localStorage.setItem('skore', JSON.stringify(skore));

  /*zjeveni skore*/
    skoreDisplay();
    document.querySelector('.moves__move--player').innerHTML =  `<img class="move__icon" src="./img/icon_move_${playerMove}.svg" alt="tah hráče - ${playerMove}">`;
    document.querySelector('.moves__move--pc').innerHTML =  `<img class="move__icon" src="./img/icon_move_${pcMove}.svg" alt="tah hráče - ${pcMove}">`;
    document.querySelector('.vysledek').innerHTML =  `${result}`;

}

function skoreDisplay() {
    document.querySelector('.skore__text--vyhry').innerHTML = `Výhry: ${skore.vyhry}`;
    document.querySelector('.skore__text--prohry').innerHTML = `Prohry: ${skore.prohry}`;
    document.querySelector('.skore__text--remizy').innerHTML = `Remízy: ${skore.remizy}`;
}

skoreDisplay();

/*animece*/
function rotateIcon() {
    const icon = document.getElementById('resetImg');
  if (icon) {
    icon.classList.add('rotating');

    icon.addEventListener('animationend', () => {
      icon.classList.remove('rotating');
    }, { once: true });
  } 
}



