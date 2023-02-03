const canvas = document.querySelector('#game');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
window.addEventListener("keydown", keyMove)

btnUp.addEventListener('click', up)
btnLeft.addEventListener('click', left)
btnRight.addEventListener('click', right)
btnDown.addEventListener('click', down)

let canvasSize;
let elementSize 


function setCanvasSize() {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementSize = canvasSize /10.5;

    startGame()
}

function startGame() {
    
    console.log(canvasSize, elementSize)

    game.font = elementSize + 'px verdana';
    game.textAlign = 'left'

    const map = maps[2];
    const mapRows = map.trim().split('\n')
    const mapsRowsCol = mapRows.map(row => row.trim().split(''))
    console.log(map, mapRows, mapsRowsCol, mapsRowsCol[0][0])

    mapsRowsCol.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementSize * (colI )
            const posY = elementSize * (rowI + 1)
            game.fillText(emoji, posX, posY)
        })
    })

    // for (let row = 1; row <= 10; row ++) {
    //     for (let xCol = 1; xCol <= 10; xCol ++) {
    //         game.fillText(emojis[mapsRowsCol[row - 1][xCol - 1]], elementSize * xCol,  elementSize * row) 
    //     }
    // }

}

function up(){
    console.log('up')
}
function left(){
    console.log('left')
    
}
function right(){
    console.log('right')
    
}
function down(){
    console.log('down')
    
}

function keyMove() {
    if(event.key === "ArrowUp") up()
    if(event.key === "ArrowLeft") left()
    if(event.key === "ArrowRight") right()
    if(event.key === "ArrowDown") down()
}
