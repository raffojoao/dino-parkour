const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let isRotating = false;
let isGameOver = false;
let rotation = 0;
let position = 12;
let score = 0;
let lives = 5;
let dificulty = 4000;
var opacity = 1;
var blinkCount = 0;


function handleKeyUp(event){
    if(event.keyCode == 32){
        if (!isJumping){
            jump();
        }
    } 
    if (event.keyCode == 81){
        if (!isJumping){
            rotate();
            jump();
        }
    }
}

function jump(){

    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 160){
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position == 12){
                    clearInterval(downInterval);
                    isJumping = false;
                    isRotating = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20)
        } else{
            position += 20;
            dino.style.bottom = position + 'px';

        }
        
    }, 20);
}

function rotate(){
    isRotating = true;
    rotation -= 360;
    dino.style.transform = 'rotate(' + rotation + 'deg)';
}

function dinoBlink() {
    let blinkInterval = setInterval(() => {
        if(blinkCount > 39){
            clearInterval(blinkInterval);
        }else{
            if (opacity == 0){
                opacity = 1;
            } else {
                opacity = 0;
            }
            dino.style.opacity = opacity;
            blinkCount++;
        }
        console.log(blinkCount);
    }, 10);
    
 }

function updateScore(){
    document.getElementById("score").innerHTML = "Score: " +score+ "<br>Lives: " +lives;
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * dificulty;
    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + '%';
    background.appendChild(cactus);

    let leftTimer = setInterval(() => {
        if(score >= 100) {
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h2 class="congratulations">CONGRATULATIONS! YOU BEAT THE GAME!</h1>'
        } 
        if(cactusPosition < -60){
            clearInterval(leftTimer);
            background.removeChild(cactus);
            dificulty -= 10;
            score+=10;
            updateScore();
        } else if (cactusPosition > 0 && cactusPosition <60 && position < 68){
            if (lives <= 1){
                clearInterval(leftTimer);
                isGameOver = true;
                document.body.innerHTML = '<h1 class="game-over">GAME OVER</h1>';
            }else if (cactusPosition > 0 && cactusPosition <60 && position > 68){
                score += 10;
            }else {
                clearInterval(leftTimer);
                background.removeChild(cactus);
                lives--;
                updateScore();
                dinoBlink();
                blinkCount = 0;
            }
        }else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)
    setTimeout(createCactus, randomTime);
}
createCactus();
document.addEventListener('keyup', handleKeyUp);

