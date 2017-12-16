require("sass/sidebar/app.scss");

import {TweenMax, Power2, TimelineLite} from "gsap";

import nullImg from '../ronImg';

function play(){
  animate();
}

function update(str){
  const data = window.data = JSON.parse(str);
  const holder = document.querySelector('.sidebar');

  if(data.photo){
    holder.classList.add('photo');
    holder.querySelector('img').src = data.photo;
  }

  holder.querySelector('.position h1').innerText = data.Position.compactName;
  holder.querySelector('.position h2').innerText = data.elected?"elect":"candidate";

  holder.querySelector('.name h1').innerText = data.firstName;
  holder.querySelector('.name h2').innerText = data.lastName;

  const manifesto = holder.querySelector('.manifesto');
  manifesto.innerHTML += "<p>"+data.manifestoOne+"</p>";
  manifesto.innerHTML += "<p>"+data.manifestoTwo+"</p>";
  manifesto.innerHTML += "<p>"+data.manifestoThree+"</p>";
}

function stop(){
  //animateOut();
  document.querySelector('body').innerHTML = "";
}

function remove() {
  document.querySelector('body').innerHTML = "";
}

function animate(){
  const tl = new TimelineLite();

  letterSpacing();

  const dataWrapper = document.querySelector('.sidebar');
  dataWrapper.classList.add('visible');

  const blurData = { myVal: blurStrength };
  
  tl.to(dataWrapper, 0.6, { ease: Power1.easeOut, css: { zIndex: 2000 } })
    .to(blurData, 0.6, { ease: Power2.easeIn, myVal: 0, onUpdate: animateBlur, onUpdateParams: ["{self}", dataWrapper, blurData] }, '-=0.6');
}

function letterSpacing(){
  const field = document.querySelector('.sidebar .position h1');
  const space1 = (field.clientWidth-field.scrollWidth)/(field.textContent.length-1);
      
  if(space1 < 0)
    field.style.letterSpacing = space1+"px";
}

function animateOut(){
  const tl = new TimelineLite();

  const dataWrapper = document.querySelector('.sidebar');
  dataWrapper.classList.remove('visible');

  const blurData = { myVal: 0 };
  
  tl.to(dataWrapper, 0.6, { ease: Power1.easeOut, css: { zIndex: 1 } })
    .to(blurData, 0.6, { ease: Power2.easeIn, myVal: blurStrength, onUpdate: animateBlur, onUpdateParams: ["{self}", dataWrapper, blurData] }, '-=0.6');
}

const blurStrength = 10;
/////// BLUR
const filters = document.querySelector(".filters"), // the SVG that contains the filters
defs = filters.querySelector("defs"), // the  element inside the SVG
blur = defs.querySelector("#motionBlur"), // the blur filter
blurFilter = blur.firstElementChild; // the feGaussianBlur primitive

function animateBlur(tl, elm, blurData){
  blurFilter.setAttribute("stdDeviation",(blurData.myVal+0.01)+",0");  
}

if (window.location.hash.indexOf("dev") != -1){
  console.log("DEV MODE");

  document.body.classList.add("dev");

  function fakeData(){
    update('{"id":23,"uid":"pres-kris-burnett","positionId":1,"firstName":"Kris","lastName":"Burnett","photo":"'+nullImg+'","manifestoOne":"Safer Selly Scheme","manifestoTwo":"Cheaper food and drink (Happy hour)","manifestoThree":"High speed reliable WiFi","order":1,"elected":false,"createdAt":"2017-02-28T21:33:19.000Z","updatedAt":"2017-03-03T21:21:12.000Z","PositionId":1,"Position":{"id":1,"type":"candidateSabb","fullName":"President","compactName":"Presidential","miniName":"President","order":10,"winnerOrder":10,"sidebarUseOfficer":false,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-03-03T15:53:04.000Z"}}');
  }

  setTimeout(fakeData, 1);
  setTimeout(play, 50);
}