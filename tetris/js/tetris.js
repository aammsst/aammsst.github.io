document.addEventListener('DOMContentLoaded',() => {
    const pause = document.querySelector(".pause");
    const gameOv = document.querySelector(".gameOv");
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const scoreDisplay = document.getElementById("score");
    const startBtn = document.getElementById("start-button");
    const lines = document.getElementById("lines");
    const lastScore = document.createElement("H2");
    const lastLine = document.createElement("H2");
    let gameO = false;
    let nextRandom = null;
    let timerId;
    let score = 0;
    let lineCounter = 0;

    const colors = [
	'#feac4e',
	'#feac4e',
	'#ccc',
	'#ccc',
	'#ccc',
	'#e44537',
	'#e44537'
    ];

    const width = 10;

    // tetrominos
    const lTetromino = [
	[width+1,width+2,width+3,width*2+1],
	[1,2,width+2,width*2+2],
	[3,width+1,width+2,width+3],
	[2,width+2,width*2+2,width*2+3]];
    const zTetromino = [
	[width+1,width+2,width*2+2,width*2+3],
	[3,width+2,width+3,width*2+2],
	[width+1,width+2,width*2+2,width*2+3],
	[3,width+2,width+3,width*2+2]];
    const oTetromino = [
	[1,2,width+1,width+2],
	[1,2,width+1,width+2],
	[1,2,width+1,width+2],
	[1,2,width+1,width+2]];
    const iTetromino = [
	[2,width+2,width*2+2,width*3+2],
	[width+1,width+2,width+3,width+4],
	[3,width+3,width*2+3,width*3+3],
	[width*2+1,width*2+2,width*2+3,width*2+4]];
    const tTetromino = [
	[width+1,width+2,width+3,width*2+2],
	[2,width+1,width+2,width*2+2],
	[2,width+1,width+2,width+3],
	[2,width+2,width+3,width*2+2]];
    const sTetromino = [
	[width+2,width+3,width*2+1,width*2+2],
	[2,width+2,width+3,width*2+3],
	[width+2,width+3,width*2+1,width*2+2],
	[2,width+2,width+3,width*2+3]];
    const jTetromino = [
	[width+1,width+2,width+3,width*2+3],
	[2,width+2,width*2+2,width*2+1],
	[1,width+1,width+2,width+3],
	[2,3,width+2,width*2+2]];
   
    const tetrominos = [lTetromino, zTetromino, oTetromino, iTetromino, tTetromino, sTetromino, jTetromino];

    let initialRot = 0;
    let initialPos = 3;
    // select random tetrominos
    let random = Math.floor(Math.random()*tetrominos.length);
    current = tetrominos[random][initialRot];
 
    // drawing tetrominos
    function draw() {
	current.forEach(index => {
	    squares[initialPos + index].classList.add('tetrominos');
	    squares[initialPos + index].style.backgroundColor = colors[random];
	    squares[initialPos + index].style.borderColor = colors[random];
	})
    };

    // undrawing tetrominos
    function undraw() {
	current.forEach(index => {
	    squares[initialPos + index].classList.remove('tetrominos');
	    squares[initialPos + index].style.backgroundColor = '';
	    squares[initialPos + index].style.borderColor = '';
	})
    };

    // move down
    function moveDown() {
	undraw();
	initialPos += width;
	draw();
	freeze();
    }

    // freeze at the bottom and when touching other pieces
    function freeze() {
	if (current.some(index => squares[initialPos + index + width].classList.contains('taken'))) {
	    current.forEach(index => squares[initialPos + index].classList.add('taken'));
	    random = nextRandom;
	    nextRandom = Math.floor(Math.random()*tetrominos.length);
	    initialRot = 0;
	    current = tetrominos[random][initialRot];
	    initialPos = 3;
	    addScore();
	    draw();
	    displayShape();
	    gameOver();
	};
    };

    // move Left
    function moveLeft() {
	undraw();
	const leftEdge = current.some(index => (initialPos + index) % width ===0);
	if (!leftEdge) initialPos -= 1;
	if (current.some(index => squares[initialPos + index].classList.contains('taken'))) {
	    initialPos += 1;
	};
	draw();
    };

    // move Right
    function moveRight() {
	undraw();
	const rightEdge = current.some(index => (initialPos + index) % width === width - 1);
	if (!rightEdge) initialPos += 1;
	if (current.some(index => squares[initialPos + index].classList.contains('taken'))) {
	    initialPos -= 1;
	};
	draw();
    };

    // rotate clockwise
    function rotateCW() {
	undraw();
	const rightEdge = current.some(index => (initialPos + index) % width === width - 1);
	const leftEdge = current.some(index => (initialPos + index) % width === 0);
	if (!rightEdge && !leftEdge) {
	    initialRot++
	    if (initialRot === current.length) initialRot = 0 
	};
	current = tetrominos[random][initialRot];
	draw();
    };

   // rotate counter clockwise
    function rotateCCW() {
	undraw();
	const rightEdge = current.some(index => (initialPos + index) % width === width - 1);
	const leftEdge = current.some(index => (initialPos + index) % width === 0);
	(!rightEdge && !leftEdge) ? (
	    (initialRot > 0)? (initialRot--)
		: initialRot = 3
	)
	    : null;
	current = tetrominos[random][initialRot];
	draw();
    };

    // move control
    function control(e) {
	if(e.keyCode === 37) {
	    moveLeft();
	} else if (e.keyCode === 39) {
	    moveRight();
	}  else if (e.keyCode === 40) {
	    moveDown();
	};
    };

    // rotation control
    function controlR(e) {
	if (e.keyCode === 70) {
	    rotateCW();
	} else if (e.keyCode === 68) {
	    rotateCCW();
	};
    };

    //show up next tetromino in mini-grid
    const displaySq = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    // tetrominos without rotation
    const upNextTetrominoes = [
	[displayWidth+1,displayWidth+2,displayWidth+3,displayWidth*2+1],// L
	[displayWidth+1,displayWidth+2,displayWidth*2+2,displayWidth*2+3],// Z
	[1,2,displayWidth+1,displayWidth+2], // O
	[2,displayWidth+2,displayWidth*2+2,displayWidth*3+2],// I
	[displayWidth+1,displayWidth+2,displayWidth+3,displayWidth*2+2], // T
	[displayWidth+2,displayWidth+3,displayWidth*2+1,displayWidth*2+2], //S
	[displayWidth+1,displayWidth+2,displayWidth+3,displayWidth*2+3] // J
    ];

    // display the shape in mini-grid
    function displayShape() {
	displaySq.forEach(square => {
	    square.classList.remove('tetrominos');
	    square.style.backgroundColor = '';
	    square.style.borderColor = '';
	})
	upNextTetrominoes[nextRandom].forEach(index => {
	    displaySq[displayIndex + index].classList.add('tetrominos');
	    displaySq[displayIndex + index].style.backgroundColor = colors[nextRandom];
	    displaySq[displayIndex + index].style.borderColor = colors[nextRandom];
	})
    };

    // start button
    startBtn.addEventListener('click', ()=>{
	if (!gameO && timerId) {
	    clearInterval(timerId);
	    document.removeEventListener('keyup',controlR);
	    document.removeEventListener('keydown',control);
	    timerId = null;
	    pause.style.display = "block";
	} else if (!gameO && nextRandom) {
	    pause.style.display = "none";
	    draw();
	    document.addEventListener('keydown',control);
	    document.addEventListener('keyup',controlR);
	    timerId = setInterval(moveDown, 500);
	    displayShape();
	} else if (!gameO) {
	    draw();
	    document.addEventListener('keydown',control);
	    document.addEventListener('keyup',controlR);
	    timerId = setInterval(moveDown, 500);
	    nextRandom = Math.floor(Math.random()*tetrominos.length);
	    displayShape();
	} else if (gameO) {
	    gameO = false;
	    for(let i = 0; i <250; i++) {
		squares[i].classList.remove("tetrominos","taken");
		squares[i].style.backgroundColor = '';
		squares[i].style.borderColor = '';
	    };
	    document.addEventListener('keydown',control);
	    document.addEventListener('keyup',controlR);
	    timerId = setInterval(moveDown, 500);
	    nextRandom = Math.floor(Math.random()*tetrominos.length);
	    displayShape();
	    score = 0;
	    scoreDisplay.innerHTML = score;
	    lineCounter = 0;
	    lines.innerHTML = lineCounter;
	    gameOv.style.display = "none";
	    gameOv.removeChild(lastLine);
	    gameOv.removeChild(lastScore);
	}
    });

    // add score
    function addScore() {
	for(let i = 0; i < 249; i += width) {

	    let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

	    let tetrisRow = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9,
		i+width, i+width+1, i+width+2, i+width+3, i+width+4, i+width+5, i+width+6, i+width+7, i+width+8, i+width+9,
		i+width*2, i+width*2+1, i+width*2+2, i+width*2+3, i+width*2+4, i+width*2+5, i+width*2+6, i+width*2+7, i+width*2+8, i+width*2+9,
		i+width*3, i+width*3+1, i+width*3+2, i+width*3+3, i+width*3+4, i+width*3+5, i+width*3+6, i+width*3+7, i+width*3+8, i+width*3+9];

	    if (i<211 && tetrisRow.every(index => squares[index].classList.contains('taken'))) {
		score += 60;
		scoreDisplay.innerHTML = score;
		lineCounter += 4;
		lines.innerHTML = lineCounter;
		tetrisRow.forEach(index => {
		    squares[index].classList.remove('taken','tetrominos');
		    squares[index].style.backgroundColor = '';
		    squares[index].style.borderColor = '';
		})
		const squaresRemoved = squares.splice(i, width*4);
		squares = squaresRemoved.concat(squares);
		squares.forEach(cell => grid.appendChild(cell));
	    } else if (row.every(index => squares[index].classList.contains('taken'))) {
		score += 10;
		scoreDisplay.innerHTML = score;
		lineCounter += 1;
		lines.innerHTML = lineCounter;
		row.forEach(index => {
		    squares[index].classList.remove('taken','tetrominos');
		    squares[index].style.backgroundColor = '';
		    squares[index].style.borderColor = '';
		})
		const squaresRemoved = squares.splice(i, width);
		squares = squaresRemoved.concat(squares);
		squares.forEach(cell => grid.appendChild(cell));
	    }
	}
    };

    // game over
    function gameOver() {
	if (current.some(index => squares[initialPos + index].classList.contains('taken'))) {
	    gameO = true;
	    lastScore.textContent = "Score: " + score;
	    lastScore.classList.add("gameOvTxt");
	    gameOv.appendChild(lastScore);
	    lastLine.textContent = "Lines: " + lineCounter;
	    lastLine.classList.add("gameOvTxt");
	    gameOv.appendChild(lastLine);
	    gameOv.style.display = "block";
	    clearInterval(timerId);
	    document.removeEventListener('keydown',control);
	    document.removeEventListener('keyup',controlR);
	}
    };
});
