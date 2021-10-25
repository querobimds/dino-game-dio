const character = document.querySelector('.character');
const background = document.querySelector('.background');
const countPoints = document.querySelector('.points'); 
let position = 0;
let isJumping = false;
let points = 0;

function showPoints() {
    countPoints.innerHTML = 'Score: ' + points;
}


function pressKeyup(e) {
    if (e.keyCode === 32) {
        if(!isJumping){
        jump();
        }
    }
}


function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        
        if(position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    character.style.bottom = position + 'px';
                }
            }, 20);
        }
        else {
            position += 20;
            character.style.bottom = position + 'px';
        }
    }, 20);
}

function createObstacle() {
    const obstacle = document.createElement('div');
    let positionObstacle = 1000;
    let randomTime = Math.random() * 6000;

    obstacle.classList.add('obstacle');
    obstacle.style.left = positionObstacle + 'px';
    background.appendChild(obstacle);
    showPoints();

    let leftInterval = setInterval(() => {
        if(positionObstacle < -60) {
            clearInterval(leftInterval);
            background.removeChild(obstacle);
            points +=  100;
            showPoints();
        } else if(positionObstacle > 0 && positionObstacle < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = `<h1 class="game-over">Game Over!<br>Score: ${points}</h1>`;  
        }
         else {
            positionObstacle -= 10;
            obstacle.style.left = positionObstacle + 'px';
        }
    }, 20);

    setTimeout(createObstacle, randomTime);
    
}

createObstacle();
document.addEventListener('keyup', pressKeyup);