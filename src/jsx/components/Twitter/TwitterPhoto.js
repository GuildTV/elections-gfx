
function renderPhotoTweet(data){
  console.log(data);

  var root = document.querySelector('.twitterPhoto');

  root.querySelector('.name h1').innerText = data.username;
  root.querySelector('.message').innerText = data.text;
  root.querySelector('.handle h2').innerText = "@"+data.handle;

  root.querySelector('.photo').style.backgroundImage = "url("+data.img+")";
}