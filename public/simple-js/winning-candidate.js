var source   = $("#template").html();
var template = Handlebars.compile(source);

var container = $('.winningCandidateContainer');

function render(id, additionalData){
  var person = findDataById(id);

  person.first = person.first.toUpperCase();
  person.last = person.last.toUpperCase();
  person.position_short = person.position_short.toUpperCase();
  person.position = person.position.toUpperCase();

  var data = {
    data: additionalData,
    person: person
  };

  container.append(template(data));

  setTimeout(animate, 100);
}

function stop(){
  container.empty();
}

function animate(){
  var tl = new TimelineLite();

  var imageWrapper = $('.imageWrapper');
  var imageText = imageWrapper.find('h1');
  var dataWrapper = $('.dataSide .inner');

  var blurData = { myVal: 10 };

  tl.to(imageWrapper, 0.6, { ease: Power1.easeOut, css: { scale:1 } })
    .to(imageText, 0.4, { ease: Power2.easeOut, top: 0 }, '-=0.44')
    .to(dataWrapper, 0.28, { ease: Power2.easeOut, css: { x: 0 } }, 0.64)
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