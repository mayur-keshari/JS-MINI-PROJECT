document.addEventListener('DOMContentLoaded',()=>{
   const gridDisplay= document.querySelector('.grid');
   const scoreDisplay=document.getElementById('score');
   const resultDisplay=document.getElementById('result');
   const width =4;
   let squares = [];
   let score = 0;
  //create the playing board
  function createboard (){
   for(let i=0; i<width*width; i++){
    const square=document.createElement('div');
    square.innerHTML = 0;
    gridDisplay.appendChild(square);
    squares.push(square);   
   }
      generate();
      generate();
  }
  createboard(); 
  
  //generate a new number
function generate(){
    const randomnumber = Math.floor(Math.random() * squares.length);
    console.log(randomnumber);
    if(squares[randomnumber].innerHTML == 0){
        squares[randomnumber].innerHTML = 2;
        //check for game over
    }else generate();
}

 function moveRight(){
    for(let i=0; i<16; i++){
        if(i%4 === 0){
          let totalOne =  squares[i].innerHTML;
          let totalTwo =  squares[i+1].innerHTML;
          let totalThree =  squares[i+2].innerHTML;
          let totalfour =  squares[i+3].innerHTML;
          let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalfour)];
          console.log(row);

          let filteredrow = row.filter(num => num);
          let missing = 4- filteredrow.length;
          let zeroes = Array(missing).fill(0);
          let newRow = zeroes.concat(filteredrow);
          squares[i].innerHTML = newRow[0]
          squares[i+1].innerHTML = newRow[1]
          squares[i+2].innerHTML = newRow[2]
          squares[i+3].innerHTML = newRow[3]          
        }
    }

 }

 function moveleft(){
  for(let i=0; i<16; i++){
    if(i%4 === 0){
        let totalOne =  squares[i].innerHTML;
        let totalTwo =  squares[i+1].innerHTML;
        let totalThree =  squares[i+2].innerHTML;
        let totalfour =  squares[i+3].innerHTML;
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalfour)];
        console.log(row);

        let filteredrow = row.filter(num => num);
        let missing = 4- filteredrow.length;
        let zeroes = Array(missing).fill(0);
        let newRow = filteredrow.concat(zeroes);
        squares[i].innerHTML = newRow[0]
        squares[i+1].innerHTML = newRow[1]
        squares[i+2].innerHTML = newRow[2]
        squares[i+3].innerHTML = newRow[3]   
    }
  }
 }

    function combinerow(){
        for(let i=0; i<15; i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combinetotal = parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinetotal;
                squares[i+1].innerHTML = 0;
                score += combinetotal;
                scoreDisplay.innerHTML = score;
            }
        }
        // checkwin();
    } 
   
    //assign functions to keys
    function control(e){
        if(e.key === 'ArrowLeft'){
            keyLeft();
        }else if(e.key === 'ArrowRight'){
            keyright();
        }
    }
    document.addEventListener('keydown',control);

    function keyLeft(){
        moveleft();
        combinerow();
        moveleft();
        generate();
    }

    function keyright(){
        moveRight();
        combinerow();
        moveRight();
        generate();
    }
})

