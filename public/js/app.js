var App = {
  widgets: [],
  loadedWidgets: [],
  eventName: "Guild Elections",
  socket: "",

  setup: function() {
  },

  setEventName: function(eventName) {
    console.log(eventName);
    App.eventName = eventName;
  },

  connectToWebsocket: function(ip, autoRender) {
    App.socket = io.connect('http://' + ip);
  },

  loadWidget: function(widget, id) {
    var data = App.findDataById(id);
    if(data === undefined)
      data = id;

    App.widgets[widget].render(data);

    App.loadedWidgets.push(widget);
  },

  updateWidget: function(widget, id){
    var data = App.findDataById(id);
    if(data === undefined)  
      data = id;

    App.widgets[widget].update(data);
  },

  stopWidget: function(widget, callback){
    App.widgets[widget].stop(callback);
  },

  changeWidget: function(currentWidget, nextWidget, id) {
    App.stopWidget(currentWidget, function(){
      App.loadWidget(nextWidget, id);
    });
  },

  findDataById: function(id){
    var win = typeof(id) === "string" && (id.substr(0,4) == "win-");
    if(win)
      id = id.substr(4);

    for(var i in Data){
      //check we have data
      if(Data[i] === undefined)
        continue;

      //find a role
      if(i == id)
        return Data[i];

      //foreach person
      for(var o in Data[i]){
        if(Data[i][o] !== undefined && Data[i][o].uid == id){
          var dat = Data[i][o];
          if(win)
            dat.elect = true;
          else 
            dat.elect = false;
          return dat;
        }
      }
    }
  },
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

var MultiProfile = React.createClass({displayName: "MultiProfile",
  render: function() {
    var divClass = 'multiProfile ' + this.props.state.MultiProfile + ' col-md-8 col-md-offset-2'
    var imageDivClass = 'image ' + this.props.data.pid + ' text-center';

    return (
      React.createElement("div", {className: divClass, "data-id":  this.props.data.uid}, 
        React.createElement("h1", {className: "text-center"},  this.props.data.name), 
        React.createElement("h3", {className: "text-center"},  this.props.data.position), 
        React.createElement("div", {className: imageDivClass }, 
          React.createElement("img", {src:  this.props.data.img, alt:  this.props.data.name})
        )
      ) 
    );
  }
});
var MultiProfileList = React.createClass({displayName: "MultiProfileList",
  getInitialState: function() {
    return {people: []};
  },
  componentDidMount: function() {
    var multiProfileContainer = $('.multiProfileContainer'),
        tl = new TimelineLite();

    TweenLite.set(multiProfileContainer, {autoAlpha:0});
    tl.to(multiProfileContainer, 0.5, {autoAlpha:1});

    this.animateIncomingNodeIn();
  },
  componentWillMount: function() {
    if (this.props.data['state'] === undefined)
      this.props.data['state'] = {};

    this.props.data.state['MultiProfile'] = "incoming";

    this.state.people.push(this.props.data)
  },
  render: function() {
    var peopleNodes = this.state.people.map(function (person) {
      return (
        React.createElement(MultiProfile, {key: person.uid, state: person.state, data: person})
      );
    });
    return (
      React.createElement("div", {className: "multiProfileContainer col-md-12"}, 
        peopleNodes 
      )
    );
  },
  animateIncomingNodeIn: function() {
    var incoming = $('.incoming:first'),
        centrePoint = ( $(window).height() - incoming.outerHeight() )/2,
        tl = new TimelineLite({onComplete: this.cycleNodes()});

    tl.to(incoming, 1, {bottom:centrePoint});
  },
  animateCurrentNodeOut: function() {
    var current = $('.current'),
    tl = new TimelineLite({onComplete: this.animateIncomingNodeIn()});

    tl.to(current, 1, {top:150});
  },
  cycleNodes: function(incoming) {
    var incoming  = $('.incoming:first'),
        current   = $('.current:first'),
        outgoing  = $('.outgoing:first');

    if (incoming.length > 0)
      App.findDataById(incoming.attr('data-id')).state['MultiProfile'] = "current";
      incoming.addClass('current').removeClass('incoming');
    
    if (current.length > 0)
      App.findDataById(current.attr('data-id')).state['MultiProfile'] = "outgoing";
      incoming.addClass('outgoing').removeClass('current');

    if (outgoing.length > 0)
      App.findDataById(outgoing.attr('data-id')).state['MultiProfile'] = "incoming";
      incoming.addClass('incoming').removeClass('current');

  }
});

App.widgets['LowerThird'] = {
  render: function(data) {
    data['eventName'] = App.eventName;
    React.render(React.createElement(LowerThird, {data: data}), $(".lowerThirdContainer")[0]);
  }, 

  update: function(data){

  },

  stop: function(callback) {
    LowerThird.animateOut();

    if(callback !== undefined)
      callback();
  },
};
App.widgets['MultiProfile'] = {
  render: function(data) {
    if(data.length <= 0)
      return;
    
    React.render(React.createElement(MultiProfileList, {data: data}), $(".sideBar")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();

    React.unmountComponentAtNode($(".sideBar")[0]);
  }
};
App.widgets['SingleProfile'] = {
  render: function(data) {
    React.render(React.createElement(SingleProfile, {data: data}), $(".sideBar")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();

    // SingleProfileList.animateOut();
    React.unmountComponentAtNode($(".sideBar")[0]);
  }
};
// App.widgets['topBar'] = {
//   render: function(data) {
//     $(".topBarContainer").html(App.templates.topBar(data));
//   },

//   update: function(data){

//   },

//   stop: function(callback) {
//     if(callback !== undefined)
//       callback();
//   }
// };
App.widgets['Twitter'] = {
  render: function(data) {
    React.render(React.createElement(Twitter, {data: data}), $(".twitterContainer")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    Twitter.animateOut();

    if(callback !== undefined)
      callback();
  }
};
var LowerThird = React.createClass({displayName: "LowerThird",
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

      tl.to($('.event'), 0.3, {autoAlpha: 0})
        .to($('.strap'), 0.3, {autoAlpha: 0}, '-=0.3')
        .to($('.lowerThird'), 0.3, {css: {width: "0.5.vw"}}, '-=0.3')
        
      tl.to($('.lowerThird'), 0.3, {css: {bottom: "-20%"}, onComplete: this.kill});
    },
    kill: function() {
      React.unmountComponentAtNode($(".lowerThirdContainer")[0])
    },
  },
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.lowerThird'), 0.5, {css: {bottom: "4.76vh"}}, 0.5);

    tl.to($('.lowerThird'), 0.25, {css: {width: "95vw"}})
      .to($('.event'), 0.25, {css: {opacity: "1", left: "11px"}},'-=0.25')
      .to($('.event'), 0, {css: {webkitFilter: "2px"}},'-=0.125')
      .to($('.event'), 0, {css: {webkitFilter: "none"}},'-=0.075')
      .to($('.event'), 0.4, {css: {fontSize: "34px", top: "10.5px"}}, '+=1.2')
      .to($('.strap'), 0.2, {autoAlpha: 1}, '-=0.2');
  },
  render: function() {
    return (
      React.createElement("div", {className: "lowerThird"}, 
        React.createElement("h3", {className: "event"},  this.props.data.eventName.toUpperCase(), " ", React.createElement("strong", null, "2015")), 
        React.createElement("h1", {className: "strap"},  this.props.data.name.toUpperCase(), " - ",  this.props.data.position.toUpperCase() + (this.props.data.elect?" ELECT":"") )
      )
    );
  }
});


var LowerThirdEvent = React.createClass({displayName: "LowerThirdEvent",
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.event'), 0.5, {autoAlpha:1}, 8);
  },
  render: function() {
    return React.createElement("h3", {className: "event"},  this.props.eventName, " ", React.createElement("strong", null, "2015"));
  }
});
var LowerThirdStrap = React.createClass({displayName: "LowerThirdStrap",
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.strap'), 0.5, {autoAlpha:1});
  },
  render: function() {
    return React.createElement("h1", {className: "strap"},  this.props.name, " - ",  this.props.position);
  }
});
var ReactTransitionGroup = React.addons.TransitionGroup;

var SingleProfile = React.createClass({displayName: "SingleProfile",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(ReactTransitionGroup, {transitionName: "test", className: "singleProfile", component: "div"}, 
          React.createElement(SingleProfileList, {data: this.props.data})
        )
      )
    );
  }
});
var ReactTransitionGroup = React.addons.TransitionGroup;

var SingleProfileList = React.createClass({displayName: "SingleProfileList",
  getInitialState: function() {
    return {
      people: [],
      currentNode: "",
    };
  },
  componentDidMount: function() {
    this.el = this.getDOMNode();
    this.$el = $(this.el);

    var tl = new TimelineLite();

    tl.to(this.$el, 1, {autoAlpha:1});
  },
  componentWillMount: function() {
    if (this.props.data['state'] === undefined)
      this.props.data['state'] = {};

    this.props.data.state['SingleProfile'] = "incoming";

    this.state.people.push(this.props.data);

    this.setState({ 
      currentNode: this.props.data.uid
    });
  },
  componentWillLeave: function(done) {
    this.el = this.getDOMNode();
    this.$el = $(this.el);
    console.log("SingleProfileList");
  },
  componentWillUnmount: function() {
    TweenLite.killTweensOf(this);
  },
  componentWillReceiveProps: function(props) {
    this.setState({
      currentNode: props.uid
    });
  },
  render: function() {
    var peopleNodes = this.state.people.map(function (person) {
        return (
            React.createElement(SingleProfileNode, {key: person.uid, data: person})
        );
    });
    return (
      React.createElement(ReactTransitionGroup, {transitionName: "singleProfileList", className: "singleProfileList col-md-12", component: "div"}, 
        peopleNodes
      )
    );
  }
});



  // animateIncomingNodeIn: function() {
  //   var incoming = $('.incoming:first'),
  //       centrePoint = ( $(window).height() - incoming.outerHeight() )/2,
  //       tl = new TimelineLite({onComplete: this.cycleNodes});

  //   tl.to(incoming, 1, {bottom:centrePoint});
  // },
  // animateCurrentNodeOut: function() {
  //   var current = $('.current'),
  //   tl = new TimelineLite({onComplete: this.animateIncomingNodeIn()});

  //   tl.to(current, 1, {top:150});
  // },
  // cycleNodes: function(incoming) {
  //   var incoming  = $('.incoming:first'),
  //       current   = $('.current:first'),
  //       outgoing  = $('.outgoing:first');

  //   if (incoming.length > 0)
  //     App.findDataById(incoming.attr('data-id')).state['SingleProfile'] = "current";
  //     incoming.addClass('current').removeClass('incoming');
  //     console.log("incoming to current")
    
    // if (current.length > 0)
    //   App.findDataById(current.attr('data-id')).state['SingleProfile'] = "outgoing";
    //   incoming.addClass('outgoing').removeClass('current');
    //   console.log("current to outgoing")

    // if (outgoing.length > 0)
    //   App.findDataById(outgoing.attr('data-id')).state['SingleProfile'] = "incoming";
    //   incoming.addClass('incoming').removeClass('outgoing');
    //   console.log("outgoing to incoming")

var SingleProfileManifesto = React.createClass({displayName: "SingleProfileManifesto",
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.one'), 0.5, {autoAlpha:1}, 8);
    tl.to($('.two'), 10, {autoAlpha:1}, 8);
  },
  render: function() {
    return (
      React.createElement("div", {className: "manifesto"}, 
        React.createElement("h2", {className: "text-center"}, "Manifesto"), 
        React.createElement("ul", null, 
          React.createElement("li", null, React.createElement("h3", {className: "one"},  this.props.manifesto.one)), 
          React.createElement("li", null, React.createElement("h3", {className: "two"},  this.props.manifesto.two)), 
          React.createElement("li", null, React.createElement("h3", {className: "three"},  this.props.manifesto.three))
        )
      )
    )
  }
});
var SingleProfileName = React.createClass({displayName: "SingleProfileName",
  render: function() {
    return (
      React.createElement("h1", {className: "text-center"},  this.props.name)
    )
  }
});
var SingleProfileNode = React.createClass({displayName: "SingleProfileNode",
  componentDidMount: function() {
    this.el = this.getDOMNode();
    this.$el = $(this.el);

    console.log("componentDidMount");

   
    var centrePoint = ( $(window).height() - this.$el.outerHeight() )/2,
        tl = new TimelineLite();

    tl.to(this.$el, 1, {bottom:centrePoint, autoAlpha:1});
  },
  componentWillLeave: function(cb) {
    this.el = this.getDOMNode();
    this.$el = $(this.el);

    var tl = new TimelineLite();

    tl.to(this.$el, 1, {bottom:"105%"});
    tl.to(this.$el, 0.5, {autoAlpha:0});
  },
  render: function() {
    var DivClass = 'singleProfileNode col-md-10 col-md-offset-1 ' + this.props.data.state['SingleProfile'];

    return (
      React.createElement("div", {className: DivClass, "data-id":  this.props.data.uid}, 
        React.createElement(SingleProfileName, {name: this.props.data.name}), 
        React.createElement(SingleProfilePosition, {position: this.props.data.position}), 
        
        React.createElement(SingleProfilePicture, {cname: this.props.manifesto, name: this.props.data.name, pid: this.props.data.pid, uid: this.props.data.uid}), 

        React.createElement(SingleProfileManifesto, {manifesto: this.props.data.manifestoPoints})
      ) 
    );
  }
});
var SingleProfilePicture = React.createClass({displayName: "SingleProfilePicture",
  render: function() {
    var imageUrl = 'public/img/roles/' + this.props.pid + '/' + this.props.uid + '.png';
    
    return (
      React.createElement("div", {className:  this.props.cname}, 
        React.createElement("img", {src: imageUrl, alt:  this.props.alt})
      )
    );
  }
});
var SingleProfilePosition = React.createClass({displayName: "SingleProfilePosition",
  render: function() {
    return (
      React.createElement("h2", {className: "text-center"},  this.props.position)
    )
  }
});
var TopBar = React.createClass({displayName: "TopBar",
  render: function() {
    return (
      React.createElement("div", null
      )
    );
  }
});
var Twitter = React.createClass({displayName: "Twitter",
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

      tl.to($('.twitter'), 0.3, {autoAlpha: 0, onComplete: this.kill});
    },
    kill: function() {
      React.unmountComponentAtNode($(".twitterContainer")[0])
    },
  },
  componentDidMount: function() {
    var tl = new TimelineLite(),
        centrePoint = ( $(window).height() - $(".twitter").outerHeight() )/2

    tl.to($(".twitter"), 0, {top: centrePoint});

    tl.to($(".twitter_logo"), 0.25, {left:"10vw", top: "5vw"})
      .to($(".twitter_logo"), 0.25, {width:"5%", left: 0, top: "5px"}, "+=0.75")
      .to($(".text"), 0.5, {autoAlpha: 1}, "-=0.25")
      .to($(".info"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to($(".twitter_img"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to($(".profile_pic"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to($(".username"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to($(".time_ago"), 0.5, {autoAlpha: 1}, "-=0.5");
  },
  render: function() {
    time_ago = this.timeSince(this.props.data.created_at)

    return (
      React.createElement("div", {className: "twitter"}, 
        React.createElement("img", {className: "twitter_logo", src: "public/img/twitter_white.png"}), 
        React.createElement("h3", {className: "text"},  this.props.data.text), 
        React.createElement("img", {className: "twitter_img", src:  this.props.data.img}), 
        React.createElement("h3", {className: "info"}, React.createElement("img", {className: "profile_pic", src:  this.props.data.profile_pic}), React.createElement("span", {className: "username"}, "@",  this.props.data.username, ","), " ", React.createElement("span", {className: "time_ago"}, time_ago, " ago"))
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

