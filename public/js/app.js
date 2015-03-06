var App = {
  widgets: [],
  loadedWidgets: [],
  eventName: "Guild Elections",
  socket: "",

  setEventName: function(eventName) {
    console.log(eventName);
    App.eventName = eventName;
  },

  connectToWebsocket: function(ip, autoRender) {
    App.socket = io.connect('http://' + ip);
    
    App.socket.on('tweet.use', function (data) {
      console.log(data);
      App.loadWidget('Twitter', data);
    });

    App.socket.on('tweet.stop', function (data) {
      console.log(data);
      App.loadWidget('Twitter', data);
    });
  },

  loadWidget: function(widget, id, params) {
    var data = App.findDataById(id);
    if(data === undefined)
      data = id;

    App.widgets[widget].render(data, params);

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
  render: function(data, title) {
    if(data.length <= 0)
      return;
    
    if($(".multiProfileContainer > *").length == 0)
      React.render(React.createElement(MultiProfileWrap, null), $(".multiProfileContainer")[0]);


    React.render(React.createElement(MultiProfileWrap, {people: data, title: title}), $(".multiProfileContainer")[0]);
    //React.render(<MultiProfileWrap />, $(".multiProfileContainer")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();

    React.unmountComponentAtNode($(".main")[0]);
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
App.widgets['TopBar'] = {
  render: function(data) {
    React.render(React.createElement(TopBar, null), $(".topBar")[0]);
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
        React.createElement("h1", {className: "strap"},  this.props.data.first.toUpperCase(), " ",  this.props.data.last.toUpperCase(), " - ",  this.props.data.position.toUpperCase() + (this.props.data.elect?" ELECT":"") )
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
var MultiProfile = React.createClass({displayName: "MultiProfile",
  render: function() {
    var divClass = 'multiProfile ';
    switch(this.props.peopleCount){
      case 6:
      case 5:
        divClass += "col-md-2 ";
        break;
      case 4:
        divClass += "col-md-3 ";
        break;
      case 3:
      case 2:
      case 1:
        divClass += "col-md-4 ";
        break;
    }

    var imageDivClass = 'image ' + this.props.data.pid + ' text-center';
    var imageUrl = 'public/img/roles/' + this.props.data.pid + '/' + this.props.data.uid + '.png';

    return (
      React.createElement("div", {className:  divClass, "data-id":  this.props.data.uid}, 
        React.createElement("div", {className:  imageDivClass }, 
          React.createElement("img", {src:  imageUrl })
        ), 
        React.createElement("h1", {className: "text-center"},  this.props.data.first.toUpperCase(), React.createElement("br", null), React.createElement("strong", null,  this.props.data.last.toUpperCase() ))
      ) 
    );
  }
});
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MultiProfileList = React.createClass({displayName: "MultiProfileList",
  componentDidMount: function() {
    var tl = new TimelineLite();
    var node = $(this.getDOMNode());

    //align all the stuff
    var peopleDiv = node.find('.people');
    var people = peopleDiv.find('.multiProfile');

    // var available = node.height() - node.find('.title').outerHeight();
    // available -= peopleDiv.outerHeight();
    // available /= 2;
    // peopleDiv.css('margin', available+'px 0');

    switch(people.length){
      case 5:
        $(people[0]).addClass('col-md-offset-1');
        peopleDiv.addClass('ppl-6-5');
        break;
      case 6:
        peopleDiv.addClass('ppl-6-5');
        break;
      case 2:
        $(people[0]).addClass('col-md-offset-2');
        peopleDiv.addClass('ppl-4-3-2-1');
        break;
      case 1:
        $(people[0]).addClass('col-md-offset-4');
        peopleDiv.addClass('ppl-4-3-2-1');
        break;
      case 3:
      case 4:
        peopleDiv.addClass('ppl-4-3-2-1');
        break;
    }

    var o = node;

    tl.to(o.find('h1'), 0.6, {top: "0px"}, "+=0.5");
  },

  render: function() {    
    var peopleCount = this.props.people.length;
    var peopleNodes = this.props.people.map(function (person) {
      return this.renderThumbnail(person, peopleCount);
    }, this);
    return (
      React.createElement("div", {className: "multiProfileOuter", key: this.props.title}, 
        React.createElement("h1", {className: "title"},  this.props.title.toUpperCase() ), 
        React.createElement("div", {className: "people col-md-10 col-md-offset-1"}, 
           peopleNodes 
        )
      )
    );
  },
      
  renderThumbnail: function(person, peopleCount){
    var divClass = 'multiProfile ';
    switch(peopleCount){
      case 6:
      case 5:
        divClass += "col-md-2 ";
        break;
      case 4:
        divClass += "col-md-3 ";
        break;
      case 3:
      case 2:
      case 1:
        divClass += "col-md-4 ";
        break;
    }

    var imageDivClass = 'image ' + person.pid + ' text-center';
    var imageUrl = 'public/img/roles/' + person.pid + '/' + person.uid + '.png';

    return (
      React.createElement("div", {className:  divClass, "data-id":  person.uid, key:  person.uid}, 
        React.createElement("div", {className:  imageDivClass }, 
          React.createElement("img", {src:  imageUrl })
        ), 
        React.createElement("h1", {className: "text-center"},  person.first.toUpperCase(), React.createElement("br", null), React.createElement("strong", null,  person.last.toUpperCase() ))
      ) 
    );
  }
});

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MultiProfileWrap = React.createClass({displayName: "MultiProfileWrap",
  render: function() {
    if(this.props.people === undefined || this.props.title === undefined)
      return (
        React.createElement("div", {className: "multiProfileOuter"}, 
          React.createElement(ReactCSSTransitionGroup, {transitionName: "fade"}, 
            React.createElement("div", {className: "multiProfileNode", key: "blank"})
          )
        )
      );

    return (
      React.createElement("div", {className: "multiProfileOuter"}, 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "fade"}, 
          React.createElement("div", {className: "multiProfileNode", key: this.props.title}, 
            React.createElement(MultiProfileList, {people: this.props.people, title: this.props.title})
          )
        )
      )
    );
  }
});          

var SingleProfile = React.createClass({displayName: "SingleProfile",
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

      tl.to($('.event'), 0.3, {autoAlpha: 0})
        .to($('.strap'), 0.3, {autoAlpha: 0}, '-=0.3')
        .to($('.lowerThird'), 0.3, {css: {width: "0.5.vw"}}, '-=0.3')
        
      tl.to($('.lowerThird'), 0.3, {css: {top: "-20%"}, onComplete: this.kill});
    },
    kill: function() {
      React.unmountComponentAtNode($(".sideBar")[0])
    },
  },
  componentDidMount: function() {
    var tl = new TimelineLite(),
        centrePoint = ( $(window).height() - $('.singleProfile').outerHeight() )/2;

    console.log(centrePoint);

    tl.to($('.singleProfile'), 1, {bottom:centrePoint, autoAlpha:1});

  },
  componentWillReceiveProps: function(nextProps) {
    var tl = new TimelineLite();

  },
  render: function() {
    var isCandidate =  (this.props.data.candidate !== undefined && this.props.data.candidate == true ? "candidate":"")
    var imageUrl = 'public/img/roles/' + this.props.data.pid + '/' + this.props.data.uid + '.png';

    return (
      React.createElement("div", {className: "singleProfileContainer"}, 
        React.createElement("div", {className: "singleProfile col-md-10 col-md-offset-1"}, 
          React.createElement("h1", {className: "text-center"},  this.props.data.first.toUpperCase(), " ",  this.props.data.last.toUpperCase() ), 
          React.createElement("h2", {className: "text-center"},  this.props.data.position.toUpperCase(), " ",  isCandidate.toUpperCase() ), 

          React.createElement("img", {src:  imageUrl }), 

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
var SingleProfileManifesto = React.createClass({displayName: "SingleProfileManifesto",
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.one'), 0.5, {autoAlpha:1}, 8);
    tl.to($('.two'), 10, {autoAlpha:1}, 8);
  },
  render: function() {
    return (
      React.createElement("div", {className: "manifesto"}, 
        React.createElement("h2", {className: "text-center"}, "MANIFESTO"), 
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
      React.createElement("h1", {className: "text-center"},  this.props.first.toUpperCase(), " ",  this.props.last.toUpperCase() )
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
    var isCandidate =  (this.props.data.candidate !== undefined && this.props.data.candidate == true)
    return (
      React.createElement("div", {className: DivClass, "data-id":  this.props.data.uid}, 
        React.createElement(SingleProfileName, {first: this.props.data.first, last: this.props.data.last}), 
        React.createElement(SingleProfilePosition, {position: this.props.data.position, isCandidate:  isCandidate }), 
        
        React.createElement(SingleProfilePicture, {cname: this.props.manifesto, pid: this.props.data.pid, uid: this.props.data.uid}), 

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
        React.createElement("img", {src:  imageUrl })
      )
    );
  }
});
var SingleProfilePosition = React.createClass({displayName: "SingleProfilePosition",
  render: function() {
    return (
      React.createElement("h2", {className: "text-center"},  this.props.position.toUpperCase(), " ",  (this.props.isCandidate == true ? "CANDIDATE": "") )
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
    var td = $('.twitter'),
        tl = new TimelineLite(),
        centrePoint = ( $(window).height() - td.outerHeight() )/2;


    tl.to(td, 0, {top: centrePoint});

    tl.to(td.find(".twitter_logo"), 0.25, {left:"10vw"})
      .to(td.find(".twitter_logo"), 0.25, {width:"5%", left: 0, top: "5px"}, "+=0.75")
      .to(td.find(".text"), 0.5, {autoAlpha: 1}, "-=0.25")
      .to(td.find(".info"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".twitter_img"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".profile_pic"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".username"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".time_ago"), 0.5, {autoAlpha: 1}, "-=0.5");
  },
  componentWillReceiveProps: function(nextProps) {
    var td = $('.twitter'),
        tl = new TimelineLite();

    tl.to(td.find(".twitter_logo"), 0.25, {width:"50%", left:"10vw"})
      .to(td.find(".text"), 0.5, {autoAlpha: 0}, "-=0.25")
      .to(td.find(".info"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".twitter_img"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".profile_pic"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".username"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".time_ago"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td, 0, {top: ( $(window).height() - td.outerHeight() )/2})
      .to(td.find(".twitter_logo"), 0.25, {width:"5%", left: 0, top: "5px"}, "+=0.75")
      .to(td.find(".text"), 0.5, {autoAlpha: 1}, "-=0.25")
      .to(td.find(".info"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".twitter_img"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".profile_pic"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".username"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".time_ago"), 0.5, {autoAlpha: 1}, "-=0.5");

  },
  render: function() {
    var time_ago = this.timeSince(this.props.data.created_at);
    var media = (this.props.data.entities.media !== undefined && this.props.data.entities.media.length > 0 ?React.createElement("img", {className: "twitter_img", src:  this.props.data.entities.media[0].media_url}):"");

    return (
      React.createElement("div", {className: "twitter"}, 
        React.createElement("img", {className: "twitter_logo", src: "public/img/twitter_white.png"}), 
        React.createElement("div", {className: "tweet"}, 
          React.createElement("h3", {className: "text"},  this.props.data.text), 
             media, 
          React.createElement("h3", {className: "info"}, React.createElement("img", {className: "profile_pic", src:  this.props.data.user.profile_image_url}), React.createElement("span", {className: "username"}, "@",  this.props.data.user.screen_name, " (",  this.props.data.user.name, "),"), " ", React.createElement("span", {className: "time_ago"},  time_ago, " ago"))
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

