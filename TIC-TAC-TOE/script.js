const gameboard=document.querySelector('#gameboard');
const infodisplay=document.querySelector('#info');

const startcells=[ "","","","","","","","",""];
let go = "circle";
infodisplay.textContent = "Start the Game!!";

function createboard(){
    startcells.forEach((_cell,index)=>{
        const cellelement = document.createElement('div');
        cellelement.classList.add('square');
        cellelement.id = index;
        cellelement.addEventListener('click',addgo);
        gameboard.appendChild(cellelement);
    })
}
createboard();

function addgo(e){
    console.log("clicked",e);
    const godisplay = document.createElement('div');
    godisplay.classList.add(go);
    e.target.appendChild(godisplay);
    go = go === "circle" ? "cross": "circle";
    infodisplay.textContent = "it is now " + go + "'s go";
    e.target.removeEventListener("click",addgo);

    checkscore();
}

function checkscore(){
    const allsquares=document.querySelectorAll(".square");
    const winningcombo = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8,],[0,4,8],[2,4,6]];

    winningcombo.forEach(array =>{
      const circlewin =  array.every(cell =>
        allsquares[cell].firstChild?.classList.contains("circle")
      )
      if(circlewin){
        infodisplay.textContent = "CIRCLE WINS!!";
        allsquares.forEach(square=>square.removeEventListener('click',addgo))
      }
    })

    winningcombo.forEach(array =>{
        const crosswins =  array.every(cell =>
          allsquares[cell].firstChild?.classList.contains("cross")
        )
        if(crosswins){
          infodisplay.textContent = "CROSS WINS!!";
          allsquares.forEach(square=>square.removeEventListener('click',addgo))
        }
      })
}