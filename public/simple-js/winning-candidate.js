
function render(id, data){
  var person = findDataById(id);

  document.getElementById('voteCount').innerText = (data.votes+"").toUpperCase();
  document.getElementById('candidateName').innerHTML = person.first.toUpperCase()+" <br /><strong>"+person.last.toUpperCase()+"</strong>";
  document.getElementById('candidatePhoto').src = "public/img/roles/"+person.pid+"/"+person.uid+".png";
}

function stop(){
  document.querySelector('body').innerHTML = "";
}

function remove() {
  document.querySelector('body').innerHTML = "";
}

function animate(){
  var tl = new TimelineLite();

  var imageWrapper = document.querySelector('.imageWrapper');
  var imageText = imageWrapper.querySelector('h1');
  var dataWrapper = document.querySelector('.dataSide .inner');

  var blurData = { myVal: 10 };

  tl.to(imageWrapper, 0.6, { ease: Power1.easeOut, css: { scale:1 } })
    .to(imageText, 0.4, { ease: Power2.easeOut, top: 0 }, '-=0.44');
  
  tl.to(dataWrapper, 0.32, { ease: Power1.easeOut, css: { x: 0 } }, 0.72)
    .to(blurData, 0.28, { ease: Power2.easeIn, myVal: 0, onUpdate: animateBlur, onUpdateParams: ["{self}", dataWrapper, blurData] }, '-=0.28');
}

/////// BLUR
var filters = document.querySelector(".filters"), // the SVG that contains the filters
defs = filters.querySelector("defs"), // the  element inside the SVG
blur = defs.querySelector("#motionBlur"), // the blur filter
blurFilter = blur.firstElementChild; // the feGaussianBlur primitive

function animateBlur(tl, elm, blurData){
  blurFilter.setAttribute("stdDeviation",blurData.myVal+",0");  
}