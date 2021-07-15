const dino = document.querySelector('#dino');
const cactus = document.querySelector('#cactus');
const count = document.querySelector('#count');
const result = document.querySelector('.result');
const startBtn = document.querySelector('#start');
const startBlock = document.querySelector('.gameStartBlock');

startBtn.addEventListener('click', startGame);

let points;

const jump = (event) => {
    if (!dino.classList.contains('jump')) {
        dino.classList.add('jump');
    }
    setTimeout(() => dino.classList.remove('jump'), 300);
}

function startGame() {
    document.body.removeChild(startBlock);
    cactus.style.animation = 'var(--animation-cactus)';
    document.addEventListener('keydown', jump);

    let isAlive = setInterval(() => {
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));
        if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
            stopGame();
        }

    }, 5)

    points = counting();
}

let gameOver = document.createElement('div');
gameOver.innerHTML = '<div class="gameOverBlock"><div>Игра окончена</div><button onclick="replay()">Начать сначала</button></div>';

function stopGame() {
    cactus.style.animation = 'none';
    document.removeEventListener('keydown', jump);
    clearInterval(points);
    result.append(gameOver);
}

function replay() {
    result.removeChild(gameOver);
    cactus.style.animation = 'var(--animation-cactus)';
    document.addEventListener('keydown', jump);
    count.innerHTML = 0;
    points = counting();
}

function counting() {
    return setInterval(() => {
        count.innerHTML = String(+(count.innerHTML) + 1);
    }, 100);
}