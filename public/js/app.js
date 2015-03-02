var App = {
  widgets: [],
  loadedWidgets: [],
  eventName: "Guild Elections",

  setup: function() {
  },

  setEventName: function(eventName) {
    App.eventName = eventName;
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
    for(var i in Data){
      //check we have data
      if(Data[i] === undefined)
        continue;

      //find a role
      if(i == id)
        return Data[i];

      //foreach person
      for(var o in Data[i]){
        if(Data[i][o] !== undefined && Data[i][o].uid == id)
          return Data[i][o];
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
      React.createElement("div", {className:  divClass, "data-id":  this.props.data.uid}, 
        React.createElement("h1", {className: "text-center"},  this.props.data.name), 
        React.createElement("h3", {className: "text-center"},  this.props.data.position), 
        React.createElement("div", {className:  imageDivClass }, 
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
var LowerThird = React.createClass({displayName: "LowerThird",
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

    tl.to($('.event'), 0, {css: {width: "0%", opacity: "0"}})
      .to($('.strap'), 0, {css: {width: "0%", opacity: "0"}})
      .to($('.lowerThird'), 0.25, {css: {width: "0.5vh", padding: "0"}})
      .to($('.lowerThird'), 0.25, {css: {bottom: "-10%"}, onComplete: this.kill}, "=0.5");
    },
    kill: function() {
      React.unmountComponentAtNode($(".lowerThirdContainer")[0])
    },
  },
  componentDidMount: function() {
    this.el = this.getDOMNode();
    this.$el = $(this.el);

    var tl = new TimelineLite();

    tl.to($('.lowerThird'), 0.25, {css: {bottom: "10vh"}}, 0.5);
    tl.to($('.lowerThird'), 0.1, {css: {padding: "1.5vh 1vw"}});

    tl.to($('.lowerThird'), 0.75, {css: {width: "80vw"}})
      .to($('.event'), 0.25, {css: {width: "100%", opacity: "1"}}, '-=0.5')
      .to($('strong'), 0.25, {css: {width: "100%", opacity: "1"}}, '-=1.25')
      .to($('.event'), 0.5, {css: {fontSize: "28px"}})
      .to($('.strap'), 0, {css: {width: "100%"}})
      .to($('.strap'), 0.5, {css: {opacity: "1"}});
  },
  componentWillUnmount: function() {
    var tl = new TimelineLite();

    tl.to($('.lowerThird'), 0.25, {autoAlpha: 0}, 0.5);
    console.log("componentWillUnmount")
  },
  render: function() {
    return (
      React.createElement("div", {className: "lowerThird"}, 
        React.createElement("h3", {className: "event"},  this.props.data.eventName.toUpperCase(), " ", React.createElement("strong", null, "2015")), 
        React.createElement("h1", {className: "strap"},  this.props.data.name.toUpperCase(), " - ",  this.props.data.position.toUpperCase() )
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
        
        React.createElement(SingleProfilePicture, {cname: this.props.manifesto, img: this.props.data.img, alt: this.props.data.name}), 

        React.createElement(SingleProfileManifesto, {manifesto: this.props.data.manifestoPoints})
      ) 
    );
  }
});
var SingleProfilePicture = React.createClass({displayName: "SingleProfilePicture",
  render: function() {
    return (
      React.createElement("div", {className:  this.props.cname}, 
        React.createElement("img", {src:  this.props.img, alt:  this.props.alt})
      )
    )
  }
});
var SingleProfilePosition = React.createClass({displayName: "SingleProfilePosition",
  render: function() {
    return (
      React.createElement("h2", {className: "text-center"},  this.props.position)
    )
  }
});