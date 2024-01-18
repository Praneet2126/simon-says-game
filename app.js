let gameSeq = [];
let userSeq = [];

let btns = ["red","yellow","green","purple"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector('h2');

document.addEventListener('keypress',() => {
    if(started == false) {
        console.log('game started');
        started = true;
        levelUp();
    }

});

function gameFlash(btn) {
    btn.classList.add('gameFlash');
    // console.log(btn);
    setTimeout(() => {
        btn.classList.remove('gameFlash');
    },90);
}

function userFlash(btn) {
    btn.classList.add('userFlash');
    setTimeout(() => {
        btn.classList.remove('userFlash');
    },90);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}   

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        if(level > highestScore) {
            highestScore = level;
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}. Highest Score = ${highestScore}</b>. <br> <center> Press any key to start again <center>` ;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(()=> {
            document.querySelector('body').style.backgroundColor = 'white';
        },200);
        reset();
    }
}

function btnPress() {
    let btn = this;
    // console.log(btn);
    userFlash(btn);

    userColor = btn.getAttribute('id');
    console.log(userColor);
    userSeq.push(userColor);

    // console.log(userSeq);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns) {
    btn.addEventListener('click', btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}