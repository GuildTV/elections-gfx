/*
 * CASPAR-CG COMMANDS
*/

// CALL 1-1 PLAY
function play(str) {
  // document.getElementById("temp").innerHTML="play2";
  window.templateData = (new DOMParser()).parseFromString(str,"text/xml");

  // widget = $(window.templateData).find('#widget #text').attr('value');
  // uid = $(window.templateData).find('#uid #text').attr('value');

  // App.loadWidget(widget, uid)
  // init();
}
// CALL 1-1 STOP
function stop(str) {
  // document.getElementById("temp").innerHTML="stop";
  window.templateData = (new DOMParser()).parseFromString(str,"text/xml");
  out();
  // document.getElementById("temp").innerHTML="stop-done";
}
// CALL 1-1 NEXT
function next() {
  // document.getElementById("temp").innerHTML="start next";
  // document.getElementById("temp").innerHTML="end next";
}
// CALL 1-1 REMOVE
function remove() {
  // document.getElementById("temp").innerHTML="remove";
}
// CALL 1-1 UPDATE STRING
function update(str) {
  // document.getElementById("temp").innerHTML="update: " + str.length;
  window.templateData = (new DOMParser()).parseFromString(str,"text/xml");
  // init();
  // addNext();
}
// CALL 1-1 INVOKE STRING
function invoke(str) {
  eval(str);
}
// CALL 1-1 INVOKE "otherFunction('testing');"
function otherFunction(str) {
  // document.getElementById("lower-third").innerHTML="Other function called with: " + str;
}

//temporary to fake data (for testing in browser)
function fake(){
  update("<templateData><componentData id=\"f0\"><data id=\"text\" value=\"Rob Sumner\" /></componentData><componentData id=\"f1\"><data id=\"text\" value=\"Is better than Julian\" /></componentData><componentData id=\"f2\"><data id=\"text\" value=\"#4455a5\" /></componentData><componentData id=\"f3\"><data id=\"text\" value=\"rollIn\" /></componentData><componentData id=\"f4\"><data id=\"text\" value=\"rollOut\" /></componentData></templateData>");
}


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
      App.wrapper = ReactDOM.render(React.createElement(TwitterWrap, null), $(".twitterContainer")[0]);

    App.wrapper.changeData(data);
  }
};


function renderPhotoTweet(data){
  console.log(data);

  var root = document.querySelector('.twitterPhoto');

  root.querySelector('.name h1').innerText = data.username;
  root.querySelector('.message').innerText = data.text;
  root.querySelector('.handle h2').innerText = "@"+data.handle;

  root.querySelector('.photo').style.backgroundImage = "url("+data.img+")";
}
var ReactTransitionGroup = React.addons.TransitionGroup;

var TwitterWrap = React.createClass({displayName: "TwitterWrap",
  getInitialState: function(){
    return {
      data: false
    };
  },

  changeData: function(newData){
    if(newData && this.state.data && newData.id == this.state.data.id)
      return;

    if(newData && !newData.id)
      return;

    this.setState({ data: newData });
  },

  render: function(){
    var tweet = React.createElement("div", null);
    if(this.state.data && this.state.data.img)
      tweet = React.createElement(TwitterPhoto, {key: this.state.data.id, data: this.state.data});
    else if (this.state.data)
      tweet = React.createElement(Twitter, {key: this.state.data.id, data: this.state.data});

    return (
      React.createElement("div", null, 
        React.createElement(ReactTransitionGroup, null, 
          tweet 
        )
      )
    );
  }
});