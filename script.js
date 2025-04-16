
let blockSize = 10;
let rows = Math.floor((window.screen.availHeight-1)/blockSize);
let cols = Math.floor((window.screen.width-1)/blockSize);

let board, context,grid,next;

window.onload = function(){
    board = document.getElementById("board");
    board.height = blockSize * rows;
    board.width = blockSize * cols;
    context = board.getContext("2d");
    setup();
    setInterval(update, 100); 
}

function update(){
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    drawGrid();
    rules();
    for(let i = 0; i< cols; i++){
        for (let j = 0; j < rows; j++){
            if(grid[i][j]==1){
                context.fillStyle = "white";
                context.fillRect(i*blockSize, j*blockSize, blockSize, blockSize);
            }
        }
    }
}

function setup(){
    
    grid = make2Darray(cols, rows);
    for(let i = 0; i< cols; i++){
        for (let j = 0; j < rows; j++){
            grid[i][j] = Math.floor(Math.random() * 2);
        }
    }
}


function drawGrid(){
    context.strokeStyle = "white";
    context.lineWidth = 1;

    for (let i = 0; i <= rows; i++) {
        context.beginPath();
        context.moveTo(0, i * blockSize);
        context.lineTo(board.width, i * blockSize);
        context.stroke();
    }

    for (let j = 0; j <= cols; j++) {
        context.beginPath();
        context.moveTo(j * blockSize, 0);
        context.lineTo(j * blockSize, board.height);
        context.stroke();
    }
}

function make2Darray(cols, rows){
    let arr = new Array(cols);
    for(let i = 0; i < arr.length;i++){
        arr[i] = new Array(rows);
    }

    return arr;
}

function rules(){
    let next = make2Darray(cols, rows);

    for(let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            let count = 0;

            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    let m = (i + k + cols) % cols;
                    let n = (j + l + rows) % rows;
                    count += grid[m][n];
                }
            }

            count -= grid[i][j]; 

            if (grid[i][j] == 1 && (count < 2 || count > 3)) {
                next[i][j] = 0;
            } else if (grid[i][j] == 0 && count == 3) {
                next[i][j] = 1;
            } else {
                next[i][j] = grid[i][j];
            }
        }
    }

    grid = next;
}

