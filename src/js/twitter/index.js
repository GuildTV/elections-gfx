require("sass/twitter/app.scss");

function renderTweet(data){
  window.imageUrl = undefined;

  if(!data) {
    document.querySelector('.twitterPhoto').style.display = "none";
    document.querySelector('.twitterText').style.display = "none";
    
  } else if(data.img){
    window.imageUrl = data.img;

    const root = document.querySelector('.twitterPhoto');

    root.querySelector('.name h1').innerText = data.username;
    root.querySelector('.message').innerText = data.text;
    root.querySelector('.handle h2').innerText = "@"+data.handle;

    root.querySelector('.photo').style.backgroundImage = "url("+data.img+")";
  } else {
    const root = document.querySelector('.twitterText');

    root.querySelector('.name h1').innerText = data.username;
    root.querySelector('.name h2').innerText = "@"+data.handle;
    root.querySelector('.message').innerText = data.text;
  }
}

function xmlToObject(str){
  const data = {};

  const xml = (new DOMParser()).parseFromString(str,"text/xml");
  const components = xml.querySelectorAll('componentData');

  for(let i=0; i < components.length; i++){
    const node = components[i];
    const id = node.getAttribute('id');

    data[id] = node.querySelector('#text').getAttribute('value');
  }

  return data;
}

window.play = function() { // animate in
  if(window.imageUrl){
    var img = new Image();
    img.onload = animate;
    img.src = window.imageUrl;
  } else {
    animate();
  }
}

window.animate = function() {
  console.log("Animating");

  var root = document.querySelector(window.imageUrl?'.twitterPhoto':'.twitterText');
  root.classList.add('visible');
}

window.stop = function() { // animate out
  console.log("Clearing");

  document.querySelector('.twitterPhoto').classList.remove('visible');
  document.querySelector('.twitterText').classList.remove('visible');
}

window.update = function(str) {
  var data = xmlToObject(str);

  renderTweet(data);
}

if (window.location.hash.indexOf("dev") != -1){
  console.log("DEV MODE");

  document.body.classList.add("dev");

  window.devText = function(){
    update("<templateData>"+
      "<componentData id=\"handle\"><data id=\"text\" value=\"GuildTelevision\"/></componentData>"+
      "<componentData id=\"username\"><data id=\"text\" value=\"World Economic Forum\"/></componentData>"+
      "<componentData id=\"text\"><data id=\"text\" value=\"Have humans pushed the world into a new geological age? https://t.co/wD4NBKzUKN #science https://t.co/LYkZ6IGNdv\"/></componentData>"+
      "</templateData>");

    setTimeout(play, 50);
  }

  window.devPhoto = function(){
    update("<templateData>"+
      "<componentData id=\"handle\"><data id=\"text\" value=\"GuildTelevision\"/></componentData>"+
      "<componentData id=\"username\"><data id=\"text\" value=\"World Economic Forum\"/></componentData>"+
      "<componentData id=\"text\"><data id=\"text\" value=\"Have humans pushed the world into a new geological age? https://t.co/wD4NBKzUKN #science https://t.co/LYkZ6IGNdv\"/></componentData>"+
      "<componentData id=\"img\"><data id=\"text\" value=\"http://pbs.twimg.com/media/CY9RFG6WkAA6VGu.png:large\"/></componentData>"+
      "</templateData>");

    setTimeout(play, 50);
  }

  window.devClean = function(){
    stop();
  }
}