const gameboard = document.querySelector('#gameboard');
const playerDisplay = document.querySelector('#player');
const infoDisplay = document.querySelector('#info-display');

const width = 8;
let playergo = "black";
playerDisplay.textContent = "black";

const startpieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
];

function createboard() {
    startpieces.forEach((startpiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startpiece;
        square.firstChild?.setAttribute("draggable", true);
        square.setAttribute('square-id', i);
        const row = Math.floor((63 - i) / 8) + 1;
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown");
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige");
        }
        if (i <= 15) {
            square.firstChild.firstChild.classList.add('black');
        }
        if (i >= 48) {
            square.firstChild.firstChild.classList.add('white');
        }
        gameboard.appendChild(square);
    })
}
createboard();


const allsquares = document.querySelectorAll('#gameboard .square');
allsquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
})
let stratpositionid;
let draggedelement;

function dragStart(e) {
    stratpositionid = e.target.parentNode.getAttribute('square-id');
    draggedelement = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropogation;
    console.log(e.target);
    const correctgo = draggedelement.firstChild.classList.contains(playergo);
    const taken = e.target.classList.contains('piece');
    const valid = checkifvalid(e.target);
    const opponentgo = playergo === "white" ? "black" : "white";
    const takenbyopponent = e.target.firstChild?.classList.contains(opponentgo);

    if (correctgo) {
        //must check this first
        if (takenbyopponent && valid) {
            e.target.parentNode.appendChild(draggedelement);
            e.target.remove();
            changeplayer();
            return;
        }
        //then check this
        if (taken && !takenbyopponent) {
            infoDisplay.textContent = "you cannot go here!!"
            setTimeout(() => infoDisplay.textContent = "", 2000);
            return;
        }
        if (valid) {
            e.target.appendChild(draggedelement);
            changeplayer();
            return;
        }
    }
}

function checkifvalid(target) {
    console.log(target);
    const targetid = target.getAttribute('square-id') || Number(target.parentNode.getAttribute('square-id'));
    console.log(targetid);


}



function changeplayer() {
    if (playergo === "black") {
        reverseids();
        playergo = "white";
        playerDisplay.textContent = "white";
    } else {
        revertids();
        playergo = "black";
        playerDisplay.textContent = "black";
    }
}

function reverseids() {
    const allsquares = document.querySelectorAll('.squares');
    allsquares.forEach((square, id) => {
        square.setAttribute('square-id', (width * width - 1) - id)
    })
}

function revertids() {
    const allsquares = document.querySelectorAll('.squares');
    allsquares.forEach((square, id) => {
        square.setAttribute('square-id', id);
    })
}