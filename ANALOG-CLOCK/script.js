const second_hand=document.getElementById("second-hand");
const minute_hand=document.getElementById("minute-hand");
const hour_hand=document.getElementById("hours-hand");

function getTime(){
   const now = new Date();
   const seconds = now.getSeconds();
   const minutes = now.getMinutes();
   const hours = now.getHours();
   const timeInterval = 6
   
   second_hand.style.transform = "rotate(" + (seconds * timeInterval)+"deg)";
   minute_hand.style.transform = "rotate("+ (minutes * timeInterval + seconds/10) +"deg)";
   hour_hand.style.transform = "rotate("+(hours * 30 + minutes/2)+"deg)"
}
setInterval(getTime,100);