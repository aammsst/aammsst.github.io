document.addEventListener('DOMContentLoaded',() => {
    const pause: HTMLElement | null = document.querySelector(".pause");
    const gameOv: HTMLElement | null = document.querySelector(".gameOv");
    const grid: HTMLElement | null = document.querySelector(".grid");
    let squares: HTMLElement[] = Array.from(document.querySelectorAll(".grid div"));
    const scoreDisplay: HTMLElement | null = document.getElementById("score");
    const startBtn: HTMLElement | null = document.getElementById("start-button");
    const lines: HTMLElement | null = document.getElementById("lines");
    const lastScore: HTMLElement | null = document.createElement("H2");
    const lastLine: HTMLElement | null = document.createElement("H2");
    let gameO = false;
    let nextRandom: number;
    let timerId: number | undefined;
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

    // tetrominos {{{
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
	[width+1,width+2,width+3,width+4],
	[2,width+2,width*2+2,width*3+2],
	[width*2+1,width*2+2,width*2+3,width*2+4],
	[3,width+3,width*2+3,width*3+3]];
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
    // }}}

    let initialRot = 0;
    let initialPos = 3;
    // select random tetrominos
    let random: number = Math.floor(Math.random()*tetrominos.length);
    let current = tetrominos[random][initialRot];
 
    // drawing, undrawing, freezing and actions {{{
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
        freeze();
        undraw();
        initialPos += width;
        draw();
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
        const leftEdge = current.some(index => (initialPos + index) % width === 0);
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
                // ------------------------- exception for L tetrominos
        } else if (rightEdge && random == 0 && initialRot != 1) {
                initialRot++
            } else if (leftEdge && random == 0 && initialRot != 3) {
                    initialRot++
                        // ------------------------- exception fot Z tetrominos
                } else if (rightEdge && random == 1) {
                        initialRot++
                    } else if (leftEdge && random == 1 && (initialRot == 0 || initialRot == 2)) {
                            initialRot++
                                // ------------------------- exception for I tetrominos
                        } else if (rightEdge && random == 3 && (initialRot == 0 || initialRot == 2)) {
                                initialRot++
                            } else if (leftEdge && random == 3 && (initialRot == 0 || initialRot == 2)) {
                                    initialRot++
                                        // ------------------------- exception for T tetrominos
                                } else if (rightEdge && random == 4 && initialRot != 1) {
                                        initialRot++
                                    } else if (leftEdge && random == 4 && initialRot != 3) {
                                            initialRot++
                                                // ------------------------- exception for S tetrominos
                                        } else if (rightEdge && random == 5) {
                                                initialRot++
                                            } else if (leftEdge && random == 5 && (initialRot == 0 || initialRot == 2)) {
                                                    initialRot++
                                                        // ------------------------- exception for J tetrominos
                                                } else if (rightEdge && random == 6 && initialRot != 1) {
                                                        initialRot++
                                                    } else if (leftEdge && random == 6 && initialRot != 3) {
                                                            initialRot++
                                                        }
                                                            if (initialRot === current.length) initialRot = 0 
                                                                current = tetrominos[random][initialRot];
                                                            draw();
    };

    // rotate counter clockwise
    function rotateCCW() {
        undraw();
        const rightEdge = current.some(index => (initialPos + index) % width === width - 1);
        const leftEdge = current.some(index => (initialPos + index) % width === 0);
        if (!rightEdge && !leftEdge) {
            initialRot--
                // ------------------------- exception for L tetrominos
        } else if (rightEdge && random == 0 && initialRot != 1) {
                initialRot--
            } else if (leftEdge && random == 0 && initialRot != 3) {
                    initialRot--
                        // ------------------------- exception fot Z tetrominos
                } else if (rightEdge && random == 1) {
                        initialRot--
                    } else if (leftEdge && random == 1 && (initialRot == 0 || initialRot == 2)) {
                            initialRot--
                                // ------------------------- exception for I tetrominos
                        } else if (rightEdge && random == 3 && (initialRot == 0 || initialRot == 2)) {
                                initialRot--
                            } else if (leftEdge && random == 3 && (initialRot == 0 || initialRot == 2)) {
                                    initialRot--
                                        // ------------------------- exception for T tetrominos
                                } else if (rightEdge && random == 4 && initialRot != 1) {
                                        initialRot--
                                    } else if (leftEdge && random == 4 && initialRot != 3) {
                                            initialRot--
                                                // ------------------------- exception for S tetrominos
                                        } else if (rightEdge && random == 5) {
                                                initialRot--
                                            } else if (leftEdge && random == 5 && (initialRot == 0 || initialRot == 2)) {
                                                    initialRot--
                                                        // ------------------------- exception for J tetrominos
                                                } else if (rightEdge && random == 6 && initialRot != 1) {
                                                        initialRot--
                                                    } else if (leftEdge && random == 6 && initialRot != 3) {
                                                            initialRot--
                                                        }
                                                            if (initialRot < 0) initialRot = 3
                                                                current = tetrominos[random][initialRot];
                                                            draw();
    };
    // }}}

    // move and rotation for pc {{{
    // move control
    function control(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            moveLeft();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            moveRight();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            moveDown();
        };
    };

    // rotation control
    function controlR(e: KeyboardEvent) {
        if (e.key === 'f') {
            rotateCW();
        } else if (e.key === 'd') {
            rotateCCW();
        };
    };
    // }}}

    // move and rotation mobile {{{
    let moveStartX: number, moveEndX: number, moveStartY: number, moveEndY: number;

    // when touch starts, takes the X value
    function mobileMoveStart(e: TouchEvent) {
        e.preventDefault();
        moveStartX = e.changedTouches[0].clientX;
        moveStartY = e.changedTouches[0].clientY;
        return moveStartY;
    };

    // when touch ends, takes the X value
    function mobileMoveEnd(e: TouchEvent) {
        e.preventDefault();
        moveEndX = e.changedTouches[0].clientX;
        moveEndY = e.changedTouches[0].clientY;
        moveDetec(moveStartX,moveEndX,moveStartY,moveEndY);
    };

    // s=Start, e=End
    function moveDetec(sx: number,ex: number,sy: number,ey: number) {
        if (sx - ex > 200) {
            moveLeft();
            moveLeft();
            moveLeft();
            moveLeft();
        } else if (sx - ex > 150){
            moveLeft();
            moveLeft();
            moveLeft();
        } else if (sx - ex > 100){
            moveLeft();
            moveLeft();
        } else if (sx - ex > 30){
            moveLeft();
        } else if (sx - ex < -200) {
            moveRight();
            moveRight();
            moveRight();
            moveRight();
        } else if (sx - ex < -150){
            moveRight();
            moveRight();
            moveRight();
        } else if (sx - ex < -100){
            moveRight();
            moveRight();
        } else if (sx - ex < -30){
            moveRight();
        } else if (ey - sy > 150){
            moveDown();
            moveDown();
            moveDown();
            moveDown();
            moveDown();
            moveDown();
            moveDown();
            moveDown();
        } else if (ey - sy > 100){
            moveDown();
            moveDown();
            moveDown();
            moveDown();
            moveDown();
            moveDown();
        } else if (ey - sy > 30){
            moveDown();
            moveDown();
            moveDown();
            moveDown();
        } else { rotateCW(); }
    }
    // }}}

    // show up next tetromino in mini-grid {{{
    const displaySq: HTMLElement[] = Array.from(document.querySelectorAll('.mini-grid div'));
    const displayWidth = 4;
    let displayIndex = 0;

    // tetrominos without rotation
    const upNextTetrominoes = [
        [displayWidth+1,displayWidth+2,displayWidth+3,displayWidth*2+1],// L
        [displayWidth+1,displayWidth+2,displayWidth*2+2,displayWidth*2+3],// Z
        [1,2,displayWidth+1,displayWidth+2], // O
        [displayWidth,displayWidth+1,displayWidth+2,displayWidth+3],// I
        [displayWidth+1,displayWidth+2,displayWidth+3,displayWidth*2+2], // T
        [displayWidth+2,displayWidth+3,displayWidth*2+1,displayWidth*2+2], // S
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
    // }}}

    // start button {{{
    if (startBtn && grid) {
        startBtn.addEventListener('click', ()=>{
            // Pause
            if (!gameO && timerId) {
                clearInterval(timerId);
                document.removeEventListener('keyup',controlR);
                document.removeEventListener('keydown',control);
                grid.removeEventListener("touchstart",mobileMoveStart);
                grid.removeEventListener("touchend",mobileMoveEnd);
                timerId = 0;
                pause!.style.display = "block";
            } else if (!gameO && nextRandom) { // Unpause
                pause!.style.display = "none";
                draw();
                document.addEventListener('keydown',control);
                document.addEventListener('keyup',controlR);
                grid.addEventListener("touchstart",mobileMoveStart)
                grid.addEventListener("touchend",mobileMoveEnd)
                timerId = setInterval(moveDown, 500);
                displayShape();
            } else if (!gameO) {// Start game
                draw();
                document.addEventListener('keydown',control);
                document.addEventListener('keyup',controlR);
                grid.addEventListener("touchstart",mobileMoveStart)
                grid.addEventListener("touchend",mobileMoveEnd)
                timerId = setInterval(moveDown, 500);
                nextRandom = Math.floor(Math.random()*tetrominos.length);
                displayShape();
            } else if (gameO) { // Start game after game over
                gameO = false;
                for(let i = 0; i <250; i++) {
                    squares[i].classList.remove("tetrominos","taken");
                    squares[i].style.backgroundColor = '';
                    squares[i].style.borderColor = '';
                };
                document.addEventListener('keydown',control);
                document.addEventListener('keyup',controlR);
                grid.addEventListener("touchstart",mobileMoveStart)
                grid.addEventListener("touchend",mobileMoveEnd)
                timerId = setInterval(moveDown, 500);
                nextRandom = Math.floor(Math.random()*tetrominos.length);
                displayShape();
                score = 0;
                scoreDisplay!.innerHTML = score.toString();
                lineCounter = 0;
                lines!.innerHTML = lineCounter.toString();
                gameOv!.style.display = "none";
                gameOv!.removeChild(lastLine);
                gameOv!.removeChild(lastScore);
            }
        });
    }
    // }}}

    // add score {{{
    function addScore() {
        for(let i = 0; i < 249; i += width) {

            // single, double, and triple detector
            let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

            // tetris (four lines) detector
            let tetrisRow = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9,
                i+width, i+width+1, i+width+2, i+width+3, i+width+4, i+width+5, i+width+6, i+width+7, i+width+8, i+width+9,
            i+width*2, i+width*2+1, i+width*2+2, i+width*2+3, i+width*2+4, i+width*2+5, i+width*2+6, i+width*2+7, i+width*2+8, i+width*2+9,
            i+width*3, i+width*3+1, i+width*3+2, i+width*3+3, i+width*3+4, i+width*3+5, i+width*3+6, i+width*3+7, i+width*3+8, i+width*3+9];

            if (i<211 && tetrisRow.every(index => squares[index].classList.contains('taken'))) {
                // tetris score
                score += 60;
                scoreDisplay!.innerHTML = score.toString();
                lineCounter += 4;
                lines!.innerHTML = lineCounter.toString();
                // removing lines
                tetrisRow.forEach(index => {
                    squares[index].classList.remove('taken','tetrominos');
                    squares[index].style.backgroundColor = '';
                    squares[index].style.borderColor = '';
                })
                // adding new lines at the top
                const squaresRemoved = squares.splice(i, width*4);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid!.appendChild(cell));
            } else if (row.every(index => squares[index].classList.contains('taken'))) {
                // single, double and triple scores
                score += 10;
                scoreDisplay!.innerHTML = score.toString();
                lineCounter += 1;
                lines!.innerHTML = lineCounter.toString();
                // removing lines
                row.forEach(index => {
                    squares[index].classList.remove('taken','tetrominos');
                    squares[index].style.backgroundColor = '';
                    squares[index].style.borderColor = '';
                })
                // adding new lines at the top
                const squaresRemoved = squares.splice(i, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid!.appendChild(cell));
            }
        }
    };
    // }}}

    // game over {{{
    function gameOver() {
        if (current.some(index => squares[initialPos + index].classList.contains('taken'))) {
            gameO = true;
            lastScore!.textContent = "Score: " + score;
            lastScore!.classList.add("gameOvTxt");
            gameOv!.appendChild(lastScore!);
            lastLine!.textContent = "Lines: " + lineCounter;
            lastLine!.classList.add("gameOvTxt");
            gameOv!.appendChild(lastLine!);
            gameOv!.style.display = "block";
            clearInterval(timerId);
            document.removeEventListener('keydown',control);
            document.removeEventListener('keyup',controlR);
        }
    };
    // }}}
});
