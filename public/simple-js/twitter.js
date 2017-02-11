
function renderTweet(data){
  if(!data) {
    document.querySelector('.twitterPhoto').style.display = "none";
    document.querySelector('.twitterText').style.display = "none";
    
  } else if(data.img){
    window.imageUrl = data.img;

    var root = document.querySelector('.twitterPhoto');

    root.querySelector('.name h1').innerText = data.username;
    root.querySelector('.message').innerText = data.text;
    root.querySelector('.handle h2').innerText = "@"+data.handle;

    root.querySelector('.photo').style.backgroundImage = "url("+data.img+")";
  } else {
    var root = document.querySelector('.twitterText');

    root.querySelector('.name h1').innerText = data.username;
    root.querySelector('.name h2').innerText = "@"+data.handle;
    root.querySelector('.message').innerText = data.text;
  }
}

function xmlToObject(str){
  var data = {};

  var xml = (new DOMParser()).parseFromString(str,"text/xml");
  var components = xml.querySelectorAll('componentData');

  for(var i=0; i < components.length; i++){
    var node = components[i];
    var id = node.getAttribute('id');

    data[id] = node.querySelector('#text').getAttribute('value');
  }

  return data;
}