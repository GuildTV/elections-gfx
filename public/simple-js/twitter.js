var App = {
  eventName: "Guild Elections",
  socket: false,

  setEventName: function(eventName) {
    console.log(eventName);
    App.eventName = eventName;
  },

  connectToWebsocket: function(ip) {
    if(App.socket)
      return;

    if(ip === undefined)
      ip = "192.168.26.105:4054";
    
    App.socket = io.connect('http://' + ip);
    
    App.socket.on('tweet.use', function (data) {
      console.log(data);
      renderTweet(data);
    });

    App.socket.on('tweet.stop', function () {
      renderTweet(false);
    });
  },

  disconnectWebsocket: function(){
    if(!App.socket)
      return;

    App.socket.disconnect();
    App.socket = false;
  }
};

function renderTweet(data){
  if(!data) {
    document.querySelector('.twitterPhoto').style.display = "none";
    document.querySelector('.twitterText').style.display = "none";
    
  } else if(data.img){
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