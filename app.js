const grid = document.querySelector('.grid');
const result = document.querySelector('.result');
const invadersRemoved = [];
let shooterIndex = 202;

let invadersId;
let isGoingRight = true;
let direction = 1;
let results = 0;

const width = 15;


for (let i = 0; i < width * width; i++) {
    const square  = document.createElement('div');
    square.id = i;
    grid.appendChild(square); 
    
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const invaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for (let i = 0; i < invaders.length; i++) {
        if(!invadersRemoved.includes(i)){
            squares[invaders[i]].classList.add('invader');
        }
        
    }
}

draw();

squares[shooterIndex].classList.add('shooter');

function remove() {
    for (let i = 0; i < invaders.length; i++) {
        squares[invaders[i]].classList.remove("invader")
    }
}

function moveShooter(e) {
    squares[shooterIndex].classList.remove('shooter');
    switch(e.key){
        case 'ArrowLeft':
            if(shooterIndex % width !== 0) {
                shooterIndex -=1;
                
            }
            break;
        case 'ArrowRight':
            if(shooterIndex % width !== 14) {
                shooterIndex +=1;
            }
            break;
    }
    squares[shooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter);

function moveInvaders() {
    const leftEdge = invaders[0] % width === 0;
    const rightEdge = invaders[invaders.length - 1] % width === width - 1;
    remove();

    if (rightEdge && isGoingRight) {
        for (let i = 0; i < invaders.length; i++) {
            invaders[i] += width + 1;
            direction = -1
            isGoingRight = false
        }
    }

    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < invaders.length; i++) {
            invaders[i] += width - 1;
            direction = 1;
            isGoingRight = true;
        }
    }

    for (let i = 0; i < invaders.length; i++) {
        invaders[i] += direction;
    }

    draw()

    if (squares[shooterIndex].classList.contains("invader")) {
        result.innerHTML = "GAME OVER"
        clearInterval(invadersId)
    }

    if (invadersRemoved.length === invaders.length) {
        result.innerHTML = "YOU WIN"
        clearInterval(invadersId)
    }
}

invadersId = setInterval(moveInvaders, 600)

function shoot(e) {
    let laserId;
    let laserIndex = shooterIndex;

    function moveLaser() {
        squares[laserIndex].classList.remove("laser");
        laserIndex -= width;
        squares[laserIndex].classList.add("laser");

        if (squares[laserIndex].classList.contains("invader")) {
            squares[laserIndex].classList.remove("laser");
            squares[laserIndex].classList.remove("invader");
            squares[laserIndex].classList.add("explosion");

            setTimeout(() => squares[laserIndex].classList.remove("explosion"), 300);
            clearInterval(laserId);

            const invaderRemoved = invaders.indexOf(laserIndex);
            invadersRemoved.push(invaderRemoved);
            results++;
            resultDisplay.innerHTML = results;
        }
    }

    if (e.key === "ArrowUp") {
        laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener('keydown', shoot)


const newgame = document.getElementById("newgame");
newgame.onclick = function(e) {
    location.reload();
}
