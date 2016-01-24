var App = {
  wrapper: null,
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
      App.renderTweet(data);
    });

    App.socket.on('tweet.stop', function () {
      App.renderTweet(false);
    });
  },

  disconnectWebsocket: function(){
    if(!App.socket)
      return;

    App.stopWidget();

    App.socket.disconnect();
    App.socket = false;
  },

  renderTweet: function(data){
    if(!App.wrapper)
      App.wrapper = ReactDOM.render(<TwitterWrap />, $(".twitterContainer")[0]);

    App.wrapper.changeData(data);
  }
};
