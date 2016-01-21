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

App.widgets['LowerThird'] = {
  wrapper: null,

  render: function(data) {
    var self = App.widgets['LowerThird'];
    if(!self.wrapper)
      self.wrapper = ReactDOM.render(React.createElement(LowerThirdWrapper, null), $(".lowerThirdContainer")[0]);

    self.wrapper.changeData(data);
  }, 

  update: function(data){
    return App.widgets['LowerThird'].render(data);
  },

  stop: function(callback) {
    return App.widgets['LowerThird'].render(false);

    //TODO - delay the callback

    if(callback !== undefined)
      callback();
  },
};
App.widgets['SingleProfile'] = {
  wrapper: null,

  render: function(data) {
    var self = App.widgets['SingleProfile'];
    if(!self.wrapper)
      self.wrapper = ReactDOM.render(React.createElement(SingleProfileWrapper, null), $(".sideBar")[0]);

    self.wrapper.changeData(data);
  },

  update: function(data){
    return App.widgets['SingleProfile'].render(data);
  },

  stop: function(callback) {
    return App.widgets['SingleProfile'].render(false);

    //TODO - delay the callback

    if(callback !== undefined)
      callback();
  }
};

App.widgets['TopBar'] = {
  render: function(data) {
    ReactDOM.render(React.createElement(TopBar, null), $(".topBarContainer ")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    TopBar.animateOut();

    if(callback !== undefined)
      callback();
  }
};
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
var ReactTransitionGroup = React.addons.TransitionGroup;

var LowerThird = React.createClass({displayName: "LowerThird",
  componentDidMount: function(){
    console.log("LT mounted");
  },
  componentWillUnmount: function(){
    console.log("LT unmounted");
  },

  componentWillEnter: function(callback){
    return this.componentWillAppear(callback);
  },

  componentWillAppear: function(callback) {
    console.log("LT animating");

    var tl = new TimelineLite();

    tl.to(this.refs.lt, 0.5, {css: {bottom: "4.76vh"}}, 0.5);

    tl.to(this.refs.lt, 0.25, {css: {width: "95vw"}})
      .to(this.refs.ev, 0.25, {css: {opacity: "1", left: "11px"}},'-=0.25')
      .to(this.refs.ev, 0, {css: {webkitFilter: "2px"}},'-=0.125')
      .to(this.refs.ev, 0, {css: {webkitFilter: "none"}},'-=0.075')
      .to(this.refs.ev, 0.4, {css: {fontSize: "34px", top: "10.5px"}}, '+=1.2')
      .to(this.refs.strap, 0.2, {autoAlpha: 1, onComplete: callback}, '-=0.2');
  },

  componentWillLeave: function(callback){
    console.log("LT leaving");

    var tl = new TimelineLite();

    tl.to(this.refs.ev, 0.3, {autoAlpha: 0})
      .to(this.refs.strap, 0.3, {autoAlpha: 0}, '-=0.3')
      .to(this.refs.lt, 0.3, {css: {width: "0.5.vw"}}, '-=0.3')
      
    tl.to(this.refs.lt, 0.3, {css: {bottom: "-20%"}})
      .to(this.refs.lt, 0, {autoAlpha: 0, onComplete: callback});
  },

  render: function() {
    if(!this.props.data){
      return React.createElement("div", null);
    }

    return (
      React.createElement("div", {className: "lowerThird", ref: "lt"}, 
        React.createElement("h3", {className: "event", ref: "ev"},  App.eventName.toUpperCase(), " ", React.createElement("strong", null, "2016")), 
        React.createElement("h1", {className: "strap", ref: "strap"},  this.props.data.first.toUpperCase(), " ",  this.props.data.last.toUpperCase(), " - ",  this.props.data.position.toUpperCase() + (this.props.data.elect?" ELECT":"") )
      )
    );
  }
});

var LowerThirdWrapper = React.createClass({displayName: "LowerThirdWrapper",
  getInitialState: function(){
    return {
      data: false
    };
  },

  changeData: function(newData){
    if(newData && this.state.data && newData.uid == this.state.data.uid)
      return;

    if(newData && !newData.uid)
      return;

    this.setState({ data: newData });
  },

  render: function(){
    var newLT = this.state.data?(React.createElement(LowerThird, {key: this.state.data.uid, data: this.state.data})):(React.createElement("div", null));

    return (
      React.createElement("div", null, 
        React.createElement(ReactTransitionGroup, null, 
          newLT 
        )
      )
    );
  }
});
var ReactTransitionGroup = React.addons.TransitionGroup;

var SingleProfile = React.createClass({displayName: "SingleProfile",
  componentDidMount: function(){
    console.log("SP mounted");
  },
  componentWillUnmount: function(){
    console.log("SP unmounted");
  },

  componentWillEnter: function(callback){
    return this.componentWillAppear(callback);
  },

  componentWillAppear: function(callback) {
    console.log("SP animating");

    var tl = new TimelineLite();
    var centrePoint = -( $(window).height() - $(this.refs.profile).outerHeight() )/2;

    tl.to(this.refs.profile, 1, {bottom: centrePoint, autoAlpha:1, onComplete: callback});
  },

  componentWillLeave: function(callback){
    console.log("SP leaving");

    var tl = new TimelineLite();

    tl.to(this.refs.profile, 1, {bottom:"75%", autoAlpha:0, onComplete: callback});
  },

  render: function() {
    if(!this.props.data){
      return React.createElement("div", null);
    }

    var isCandidate =  (this.props.data.candidate !== undefined && this.props.data.candidate == true ? "candidate":"");
    var imageUrl = 'public/img/roles/' + this.props.data.pid + '/' + this.props.data.uid + '.png';

    return (
      React.createElement("div", {className: "singleProfileContainer col-md-12"}, 
        React.createElement("div", {className: "singleProfile col-md-10 col-md-offset-1", ref: "profile"}, 
          React.createElement("h1", {className: "text-center"},  this.props.data.first.toUpperCase(), " ",  this.props.data.last.toUpperCase() ), 
          React.createElement("h2", {className: "text-center"},  this.props.data.position.toUpperCase(), " ",  isCandidate.toUpperCase() ), 

          React.createElement("img", {src: imageUrl }), 

          React.createElement("h2", {className: "text-center"}, "MANIFESTO"), 
          React.createElement("ul", null, 
            React.createElement("li", null, React.createElement("h3", {className: "one"},  this.props.data.manifestoPoints.one)), 
            React.createElement("li", null, React.createElement("h3", {className: "two"},  this.props.data.manifestoPoints.two)), 
            React.createElement("li", null, React.createElement("h3", {className: "three"},  this.props.data.manifestoPoints.three))
          )
        )
      )
    );
  }
});

var SingleProfileWrapper = React.createClass({displayName: "SingleProfileWrapper",
  getInitialState: function(){
    return {
      data: false
    };
  },

  changeData: function(newData){
    if(newData && this.state.data && newData.uid == this.state.data.uid)
      return;

    if(newData && !newData.uid)
      return;

    this.setState({ data: newData });
  },

  render: function(){
    var profile = this.state.data?(React.createElement(SingleProfile, {key: this.state.data.uid, data: this.state.data})):(React.createElement("div", null));

    return (
      React.createElement("div", null, 
        React.createElement(ReactTransitionGroup, null, 
          profile 
        )
      )
    );
  }
});
var Time = React.createClass({displayName: "Time",
  updateClock: function() {
    var currentTime = new Date ( );
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds ( );

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes;          
    
    this.setState({time: currentTimeString});
          
  },
  getInitialState: function() {
    return {time: ""};
  },
  componentDidMount: function() {
    this.updateClock()
    setInterval(this.updateClock, 1000);
  },
  render: function() {
    return (
      React.createElement("div", {className: "time col-md-4"}, 
         this.state.time
      )
    );
  }
})
var TopBar = React.createClass({displayName: "TopBar",
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

      tl.to($('.singleProfile'), 1, {bottom:"75%", autoAlpha:0, onComplete: this.kill});
    },
    kill: function() {
      React.unmountComponentAtNode($(".topBarContainer")[0])
    },
  },
  componentDidMount: function() {
    var tl = new TimelineLite(),
        centrePoint = -( $(window).height() - $('.singleProfile').outerHeight() )/2;

    tl.to($('.singleProfile'), 1, {bottom: centrePoint, autoAlpha:1});
  },
  componentWillReceiveProps: function(nextProps) {
    var tl = new TimelineLite();
  },
  render: function() {
    return (
      React.createElement("div", {className: "topBar col-md-14"}, 
        React.createElement(Time, null)
      )
    );
  }
});
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