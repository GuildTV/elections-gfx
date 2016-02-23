
function render(id, data, showPhoto){
  var person = data;

  var holder = document.querySelector('.sidebar');

  if(showPhoto){
    holder.classList.add('photo');
    holder.querySelector('img').src = person.photo;
  }

  holder.querySelector('.position h1').innerText = person.position.compactName;
  holder.querySelector('.position h2').innerText = data.elected?"elect":"candidate";

  holder.querySelector('.name h1').innerText = person.firstName;
  holder.querySelector('.name h2').innerText = person.lastName;

  var manifesto = holder.querySelector('.manifesto');
  manifesto.innerHTML += "<p>"+person.manifesto.one+"</p>";
  manifesto.innerHTML += "<p>"+person.manifesto.two+"</p>";
  manifesto.innerHTML += "<p>"+person.manifesto.three+"</p>";
  // for(var i in person.manifesto){
  //   manifesto.innerHTML += "<p>"+person.manifesto[i]+"</p>";
  // }
}

function stop(){
  //animateOut();
  document.querySelector('body').innerHTML = "";
}

function remove() {
  document.querySelector('body').innerHTML = "";
}

function animate(){
  var tl = new TimelineLite();

  letterSpacing();

  var dataWrapper = document.querySelector('.sidebar');
  dataWrapper.classList.add('visible');

  var blurData = { myVal: blurStrength };
  
  tl.to(dataWrapper, 0.6, { ease: Power1.easeOut, css: { zIndex: 2000 } })
    .to(blurData, 0.6, { ease: Power2.easeIn, myVal: 0, onUpdate: animateBlur, onUpdateParams: ["{self}", dataWrapper, blurData] }, '-=0.6');
}

function letterSpacing(){
  
  var field = document.querySelector('.sidebar .position h1');
  
  var space1 = (field.clientWidth-field.scrollWidth)/(field.textContent.length-1);
      
  if(space1 < 0)
    field.style.letterSpacing = space1+"px";
}

function animateOut(){
  var tl = new TimelineLite();

  var dataWrapper = document.querySelector('.sidebar');
  dataWrapper.classList.remove('visible');

  var blurData = { myVal: 0 };
  
  tl.to(dataWrapper, 0.6, { ease: Power1.easeOut, css: { zIndex: 1 } })
    .to(blurData, 0.6, { ease: Power2.easeIn, myVal: blurStrength, onUpdate: animateBlur, onUpdateParams: ["{self}", dataWrapper, blurData] }, '-=0.6');
}

var blurStrength = 10;
/////// BLUR
var filters = document.querySelector(".filters"), // the SVG that contains the filters
defs = filters.querySelector("defs"), // the  element inside the SVG
blur = defs.querySelector("#motionBlur"), // the blur filter
blurFilter = blur.firstElementChild; // the feGaussianBlur primitive

function animateBlur(tl, elm, blurData){
  blurFilter.setAttribute("stdDeviation",(blurData.myVal+0.01)+",0");  
}