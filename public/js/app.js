var App = {
  widgets: [],
  loadedWidgets: [],
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
      App.loadWidget('Twitter', data);
    });

    App.socket.on('tweet.stop', function () {
      App.stopWidget('Twitter');
    });
  },

  disconnectWebsocket: function(){
    if(!App.socket)
      return;

    App.stopWidget('Twitter');

    App.socket.disconnect();
    App.socket = false;
  },

  loadWidget: function(widget, id, params) {
    var data = findDataById(id);
    if(data === undefined)
      data = id;

    App.widgets[widget].render(data, params);

    App.loadedWidgets.push(widget);
  },

  updateWidget: function(widget, id){
    var data = findDataById(id);
    if(data === undefined)  
      data = id;

    App.widgets[widget].update(data);
  },

  stopWidget: function(widget, callback){
    App.widgets[widget].stop(callback);
  },

  changeWidget: function(currentWidget, nextWidget, id, params) {
    App.stopWidget(currentWidget, function(){
      App.loadWidget(nextWidget, id, params);
    });
  },

  showHideBlue: function(show){
    if(!window.ISDEV)
      return;

    if(show){
      $('#blue-bg').css("display", "block");
    } else {
      $('#blue-bg').css("display", "none");
    }
  }
};

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

App.widgets['Twitter'] = {
  wrapper: null,

  render: function(data) {
    var self = App.widgets['Twitter'];
    if(!self.wrapper)
      self.wrapper = ReactDOM.render(React.createElement(TwitterWrap, null), $(".twitterContainer")[0]);

    self.wrapper.changeData(data);
  }, 

  update: function(data){
    return App.widgets['Twitter'].render(data);
  },

  stop: function(callback) {
    return App.widgets['Twitter'].render(false);

    //TODO - delay the callback

    if(callback !== undefined)
      callback();
  },
};
var Twitter = React.createClass({displayName: "Twitter",
  componentDidMount: function(){
    console.log("Tweet mounted");
  },
  componentWillUnmount: function(){
    console.log("Tweet unmounted");
  },
  componentWillAppear: function(callback) {
    console.log("Tweet animating");

    var td = $(this.refs.tweet),
        tl = new TimelineLite();

    // ensure the image position is centered
    if(td.find('.twitter_img').length > 0){
      var img = new Image();
      img.onload = function(){
        var imageMargin = ((td.find('.tweet').width() - td.find('.twitter_img_landscape').width())/2)+"px";
        td.find('.twitter_img_landscape').css('left', imageMargin);
      };
      img.src = td.find('.twitter_img')[0].src;
    }

    // ensure the tweet is centered
    var globalLeft = ((1920 - td.width())/2)+"px";
    td.css('left', globalLeft);

    // ensure the twitter logo is vertically centered
    var iconLargeTopPos = (td.find('.tweet').height()/2)+"px";
    td.find('.twitter_logo').css('top', iconLargeTopPos);

    var iconLargeLeftPos = (td.find('.tweet').width()/2)+"px";
    //var iconLeftPos = (td.find('.tweet').width()/2)+"px";//td.find('.tweet').offset().left+"px";

    tl.to(td.find(".twitter_logo"), 0.25, {left: iconLargeLeftPos})// left: "32.5vw"
      .to(td.find(".twitter_logo"), 0.25, {width:"172.8px", left: "86.4px", top: "86.4px"}, "+=0.75") //width: "9vw"
      .to(td.find(".text"), 0.5, {autoAlpha: 1}, "-=0.25")
      .to(td.find(".info"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".twitter_img"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".profile_pic"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".username"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".time_ago"), 0.5, {autoAlpha: 1, onComplete: callback}, "-=0.5");
  },

  //TODO - replace this. needs to be called on changing tweet, instead of other animation
  componentWillEnter: function(callback) {
    console.log("Tweet changing");
    var td = $(this.refs.tweet),
        tl = new TimelineLite();

    // some dimensions/positions wont match the animation above
    /*tl.to(td.find(".twitter_logo"), 0.25, {width:"50%", left:"10vw"})
      .to(td.find(".text"), 0.5, {autoAlpha: 0}, "-=0.25")
      .to(td.find(".info"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".twitter_img"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".profile_pic"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".username"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".time_ago"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".twitter_logo"), 0.25, {width:"9vw", left: 0, top: "5px"}, "+=0.75")
      .to(td.find(".text"), 0.5, {autoAlpha: 1}, "-=0.25")
      .to(td.find(".info"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".twitter_img"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".profile_pic"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".username"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".time_ago"), 0.5, {autoAlpha: 1, onComplete: callback}, "-=0.5");*/

      return this.componentWillAppear(callback);
  },


  componentWillLeave: function(callback){
    console.log("LT leaving");

    var tl = new TimelineLite();

    //TODO - reverse in animation
    tl.to(this.refs.tweet, 0.3, {autoAlpha: 0, onComplete: callback});
  },

  render: function() {
    var time_ago = this.timeSince(this.props.data.created_at);
    var media = (this.props.data.entities.media !== undefined && this.props.data.entities.media.length > 0 ?React.createElement("img", {className: "twitter_img_landscape twitter_img", src:  this.props.data.entities.media[0].media_url}):"");

    var profile_pic = this.props.data.user.profile_image_url.replace("_normal", "");

    return (
      React.createElement("div", {className: "tweetOuter"}, 
        React.createElement("div", {className: "twitter", ref: "tweet"}, 
          React.createElement("img", {className: "twitter_logo", src: "public/img/twitter_white.png"}), 
          React.createElement("div", {className: "tweet"}, 
            React.createElement("h3", {className: "text"},  this.props.data.text), 
              media, 
            React.createElement("h3", {className: "info"}, 
              React.createElement("div", {className: "profile_pic", style: { backgroundImage: 'url('+profile_pic+')'}}), 
              React.createElement("span", {className: "username"}, "@",  this.props.data.user.screen_name, " (",  this.props.data.user.name, "),"), 
              React.createElement("span", {className: "time_ago"}, " ", time_ago, " ago")
            )
          )
        )
      )
    );
  },

  timeSince: function(date) {
    tdate = new Date(date)
    var seconds = Math.floor((new Date() - tdate) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
});


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
    var tweet = this.state.data?(React.createElement(Twitter, {key: this.state.data.id, data: this.state.data})):(React.createElement("div", null));

    App.showHideBlue(!!this.state.data);

    return (
      React.createElement("div", null, 
        React.createElement(ReactTransitionGroup, null, 
          tweet 
        )
      )
    );
  }
});