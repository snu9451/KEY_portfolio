'use strict'
let audio = document.querySelector('audio');
let avatar__logo = document.querySelector('.avatar img');
let main__area = document.querySelector('.main__area');
let about__area = document.querySelector('.about__area');
let logo = document.querySelector('.logo');
let myheader = document.querySelector('.myheader');
let scroll__down = document.querySelector('.scroll__down');

avatar__logo.onclick = function () {
  console.log("윈도우 로딩완료");
  if (audio.paused) {
    audio.currentTime = 0;
    audio.play();
  } else {
    audio.pause();
  }
  
}
window.onmousewheel = () => {
  if(event.deltaY < 0){
    console.log("위로돌림 - 위로 올라갈래");
    scrollup();
  }
  else if(event.deltaY > 0) {
    console.log("아래로아래로");
    scrolldown();
  }
}

function scrollup(){
  main__area.style.animation = "fadeInDown 1s ease forwards";
  about__area.style.animation = "fadeOutUp 1s ease forwards";
  logo.style.animation = "fadeInLeft 1s ease forwards";
  myheader.style.animation = "fadeInDown 1s ease forwards";
  // main__area.style.display = "flex";
  main__area.style.visibility = "visible";
  about__area.style.visibility = "hidden";
  logo.style.visibility = "visible";
  myheader.style.visibility = "visible";
}

function scrolldown(){
  main__area.style.animation = "fadeOutUp 1s ease forwards";
  about__area.style.animation = "fadeInUp 1s ease forwards";
  about__area.style.visibility = "visible";
  logo.style.animation = "fadeOutUp 1s ease forwards";
  myheader.style.animation = "fadeOutUp 1s ease forwards";
  // main__area.style.display = "none";
  main__area.style.visibility = "hidden";
  logo.style.visibility = "hidden";
  myheader.style.visibility = "hidden";

}
// window.addEventListener('wheel', () =>{
//   console.log("스크롤!");
// });