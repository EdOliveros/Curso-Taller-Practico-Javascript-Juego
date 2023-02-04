const canvas = document.querySelector('#game');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const game = canvas.getContext('2d');
const spanLives = document.querySelector('#lives')
const spanTimes = document.querySelector('#time')
const spanRecord = document.querySelector('#record')
const result = document.querySelector('#result')

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
window.addEventListener("keydown", keyMove)

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)

let canvasSize;
let elementSize
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftposition = {
    x: undefined,
    y: undefined,
}

let enemiesPosition = [];

function setCanvasSize() {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvasSize = Number(canvasSize.toFixed(3))

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementSize = canvasSize /10.5;

    playerPosition.x = undefined;
    playerPosition.y = undefined

    startGame()
}

function startGame() {
    
    console.log(canvasSize, elementSize)

    game.font = elementSize + 'px verdana';
    game.textAlign = 'center'

    const map = maps[level];

    if(!map) {
      gameWin(); 
      return; 
    }

    if(!timeStart) {
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 100)
        showTimeRecord();
    }

    const mapRows = map.trim().split('\n')
    const mapsRowsCol = mapRows.map(row => row.trim().split(''))
    // console.log(map, mapRows, mapsRowsCol, mapsRowsCol[0][0])

    showLives();

    game.clearRect(0,0,canvasSize, canvasSize )
    enemiesPosition = [];

    mapsRowsCol.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementSize * (colI + 1)
            const posY = elementSize * (rowI + 1)

            if(col === 'O') {
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            } else if(col == 'I') {
                giftposition.x = posX
                giftposition.y = posY
            } else if( col == 'X') {
                enemiesPosition.push({
                    x: posX,
                    y: posY,
                })
            }
            game.fillText(emoji, posX, posY)
        })
          
    })
    
    movePlayer()
    // for (let row = 1; row <= 10; row ++) {
    //     for (let xCol = 1; xCol <= 10; xCol ++) {
    //         game.fillText(emojis[mapsRowsCol[row - 1][xCol - 1]], elementSize * xCol,  elementSize * row) 
    //     }
    // }

}

function movePlayer() {
    const giftColisionX = playerPosition.x.toFixed() == giftposition.x.toFixed()
    const giftColisionY = playerPosition.y.toFixed() == giftposition.y.toFixed()
    const giftColision = giftColisionX && giftColisionY

    if( giftColision ) {
        levelWin()
    }

    const enemyColision = enemiesPosition.find(enemy => {
        const enemyColisionX = enemy.x.toFixed(1) == playerPosition.x.toFixed(1)
        const enemyColisionY =enemy.y.toFixed(1) == playerPosition.y.toFixed(1)

        return enemyColisionX && enemyColisionY
    })

    if( enemyColision ) {
        levelOver();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y) 
}

function levelWin() {
    console.log('Subiste de nivel!')
    level ++;
    startGame()
}

function gameWin() {
    
    clearInterval(timeInterval);

    const playerTime = Date.now() - timeStart

    const recordTime = localStorage.getItem('recordTime')
    if( recordTime ) {
        
        if(recordTime > playerTime) {
            localStorage.setItem('recordTime', playerTime)
           result.innerHTML = ('muy bien, superaste el record!!')
        } else {
            result.innerHTML = ('sorry, you are bad')
        }
    } else {
        localStorage.setItem('recordTime', playerTime)
        result.innerHTML = ('Your first time? pues trata de superarte...')
    }
    
    console.log(recordTime, playerTime)
}

function levelOver() {
    lives --;
   
    if( lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }
    playerPosition.x = undefined
    playerPosition.y = undefined
    
    startGame()
   
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART'])

    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart))   
}
 
function showTime() {
    spanTimes.innerHTML = Date.now() - timeStart
}

function showTimeRecord() {
    spanRecord.innerHTML = localStorage.getItem('recordTime')
}


function moveUp(){
    if ((playerPosition.y - elementSize) < elementSize) {
        console.log('out')
    } else {
        playerPosition.y -= elementSize 
        startGame()
    }
    
}

function moveLeft(){
    if ((playerPosition.x - elementSize) < elementSize) {
        console.log('out')
    } else {
        playerPosition.x -= elementSize 
        startGame()
    }
    
}

function moveRight(){
    if ((playerPosition.x + elementSize) > canvasSize) {
        console.log('out')
    } else {
        playerPosition.x += elementSize 
        startGame()
    }
    
}

function moveDown(){
    if ((playerPosition.y + elementSize) > canvasSize) {
        console.log('out')
    } else {
        playerPosition.y += elementSize 
        startGame()
    }
    
    
}

function keyMove(event) {
    if(event.key === "ArrowUp") moveUp()
    if(event.key === "ArrowLeft") moveLeft()
    if(event.key === "ArrowRight") moveRight()
    if(event.key === "ArrowDown") moveDown()
}
