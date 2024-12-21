const gameboard=document.querySelector('#gameboard');
const playerDisplay=document.querySelector('#player');
const infoDisplay=document.querySelector('#info-display');

const width = 8;

const startpieces = [
    rook,knight,bishop,queen,king,bishop,knight,rook,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rook,knight,bishop,queen,king,bishop,knight,rook
];

function createboard(){
    startpieces.forEach((startpiece,i)=>{
       const square = document.createElement('div');
       square.classList.add('square');
       square.innerHTML = startpiece;
       square.setAttribute('square-id',i);
    //    square.classList.add('beige');
    const row = Math.floor((63-i)/8) + 1;
    if(row %2 === 0){
       square.classList.add(i%2 === 0 ? "beige":"brown");
    }else{
        square.classList.add(i%2 === 0 ? "brown":"beige");
    }
       gameboard.appendChild(square);
    })
}
createboard();
console.log(startpieces)