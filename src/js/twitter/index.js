require("sass/twitter/app.scss");

window.update = function(str) {
  const data = JSON.parse(str);

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

window.play = function() { // animate in
  if(window.imageUrl){
    const img = new Image();
    img.onload = animate;
    img.src = window.imageUrl;
  } else {
    animate();
  }
};

function animate() {
  console.log("Animating");

  const elm = document.querySelector(window.imageUrl?'.twitterPhoto':'.twitterText');
  elm.classList.add('visible');
}

window.stop = function() { // animate out
  console.log("Clearing");

  document.querySelector('.twitterPhoto').classList.remove('visible');
  document.querySelector('.twitterText').classList.remove('visible');
};

if (window.location.hash.indexOf("dev") != -1){
  console.log("DEV MODE");

  document.body.classList.add("dev");

  window.devText = function(){
    window.update('{"raw_id":706217834804875300,"id":706209435849465900,"handle":"addictedtowheat","username":"Zedeepee","text":"Jaffrina should have won. #guildelections"}');

    setTimeout(window.play, 50);
  };

  window.devPhoto = function(){
    window.update('{"raw_id":706217834804875300,"id":706209435849465900,"handle":"addictedtowheat","username":"Zedeepee","text":"Jaffrina should have won. #guildelections","img":"http://pbs.twimg.com/media/CY9RFG6WkAA6VGu.png:large"}');

    setTimeout(window.play, 50);
  };

  window.devClean = function(){
    window.stop();
  };
}