document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4;
    let squares = [];
    let score = 0;
    //create the playing board
    function createboard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }
    createboard();

    //generate a new number
    function generate() {
        const randomnumber = Math.floor(Math.random() * squares.length);
        console.log(randomnumber);
        if (squares[randomnumber].innerHTML == 0) {
            squares[randomnumber].innerHTML = 2;
            checkforgameover();
        } else generate();
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalfour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalfour)];
                console.log(row);

                let filteredrow = row.filter(num => num);
                let missing = 4 - filteredrow.length;
                let zeroes = Array(missing).fill(0);
                let newRow = zeroes.concat(filteredrow);
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }

    }

    function moveleft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalfour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalfour)];
                console.log(row);

                let filteredrow = row.filter(num => num);
                let missing = 4 - filteredrow.length;
                let zeroes = Array(missing).fill(0);
                let newRow = filteredrow.concat(zeroes);
                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveup() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalfour = squares[i + width * 3].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalfour)];
            console.log(column);

            let filteredcolumn = column.filter(num => num);
            let missing = 4 - filteredcolumn.length;
            let zeroes = Array(missing).fill(0);
            let newcolumn = filteredcolumn.concat(zeroes);
            squares[i].innerHTML = newcolumn[0]
            squares[i + width].innerHTML = newcolumn[1]
            squares[i + width * 2].innerHTML = newcolumn[2]
            squares[i + width * 3].innerHTML = newcolumn[3]
        }
    }

    function moveup() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalfour = squares[i + width * 3].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalfour)];
            console.log(column);

            let filteredcolumn = column.filter(num => num);
            let missing = 4 - filteredcolumn.length;
            let zeroes = Array(missing).fill(0);
            let newcolumn = zeroes.concat(filteredcolumn);
            squares[i].innerHTML = newcolumn[0]
            squares[i + width].innerHTML = newcolumn[1]
            squares[i + width * 2].innerHTML = newcolumn[2]
            squares[i + width * 3].innerHTML = newcolumn[3]
        }
    }
    function combinerow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinetotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinetotal;
                squares[i + 1].innerHTML = 0;
                score += combinetotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkwin();
    }

    function combinecolumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinetotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinetotal;
                squares[i + width].innerHTML = 0;
                score += combinetotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkwin();
    }

    //assign functions to keys
    function control(e) {
        if (e.key === 'ArrowLeft') {
            keyLeft();
        } else if (e.key === 'ArrowRight') {
            keyright();
        } else if (e.key === 'ArrowUp') {
            keyUp();
        } else if (e.key === 'ArrowDown') {
            keyDown();
        }
    }
    document.addEventListener('keydown', control);

    function keyLeft() {
        moveleft();
        combinerow();
        moveleft();
        generate();
    }

    function keyright() {
        moveRight();
        combinerow();
        moveRight();
        generate();
    }

    function keyUp() {
        moveup();
        combinecolumn();
        moveup();
        generate();
    }

    function keyDown() {
        moveDown();
        combinecolumn();
        moveDown();
        generate();
    }

    //check for 2048 in the squares to win

    function checkwin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You Win!!";
                document.removeEventListener('keydown', control);
                setTimeout(clear, 3000);
            }
        }
    }

    //check if there are no zeroes on the board to loss
    function checkforgameover() {
        let zeroes = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeroes++;
            }
        }
        if (zeroes === 0) {
            resultDisplay.innerHTML = 'You LOSE!';
            document.removeEventListener('keydown', control);
            setTimeout(clear, 3000);
        }
    }

    function clear() {
        clearInterval(mytimer);
    }


    //add colors
    function addcolors() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = "#afa192";
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = "#eee4da";
            else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = "#ede0c8";
            else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = "#f2b179";
            else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = "#ffcea4";
            else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = "#e8c064";
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = "#ffab6e";
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = "#fd9982";
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = "#ead79c";
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = "#76daff";
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = "#beeaa5";
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = "#d7d4f0";
        }
    }
    addcolors();
    let mytimer = setInterval(addcolors, 50);
})

