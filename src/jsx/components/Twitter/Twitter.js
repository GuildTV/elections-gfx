
function renderTweet(data){
  if(data.img){
    var root = document.querySelector('.twitterPhoto');
    root.style.display = "block";

    root.querySelector('.name h1').innerText = data.username;
    root.querySelector('.message').innerText = data.text;
    root.querySelector('.handle h2').innerText = "@"+data.handle;

    root.querySelector('.photo').style.backgroundImage = "url("+data.img+")";
  } else {
    var root = document.querySelector('.twitterText');
    root.style.display = "block";

    root.querySelector('.name h1').innerText = data.username;
    root.querySelector('.name h2').innerText = "@"+data.handle;
    root.querySelector('.message').innerText = data.text;
  }
}