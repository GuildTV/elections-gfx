/** @jsx React.DOM */
var App = {
  widgets: [],
  loadedWidgets: [],
  eventName: "Presidential Debate", // Move this later

  setup: function() {
  },

  loadWidget: function(widget, id) {
    var data = App.findDataById(id);
    if(data === undefined)
      data = undefined;

    App.widgets[widget].render(data);

    App.loadedWidgets.push(widget);
  },

  updateWidget: function(widget, id){
    var data = App.findDataById(id);
    if(data === undefined)
      return;

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
      if(Data[i] === undefined)
        continue;

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
  init();
  addNext();
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

var MultiProfile = React.createClass({
  render: function() {
    var divClass = 'multiProfile ' + this.props.state.MultiProfile + ' col-md-8 col-md-offset-2'
    var imageDivClass = 'image ' + this.props.data.pid + ' text-center';

    return (
      <div className={ divClass } data-id={ this.props.data.uid }>
        <h1 className='text-center'>{ this.props.data.name }</h1>
        <h3 className='text-center'>{ this.props.data.position }</h3>
        <div className={ imageDivClass }>
          <img src={ this.props.data.img } alt={ this.props.data.name } />
        </div>
      </div> 
    );
  }
});
var MultiProfileList = React.createClass({
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
        <MultiProfile key={person.uid} state={person.state} data={person} />
      );
    });
    return (
      <div className='multiProfileContainer col-md-12'>
        { peopleNodes }
      </div>
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
    React.render(<LowerThird data={data} />, $(".lowerThirdContainer")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();

    React.unmountComponentAtNode($(".lowerThirdContainer")[0]);
  }
};
App.widgets['MultiProfile'] = {
  render: function(data) {
    React.render(<MultiProfileList data={data} />, $(".sideBar")[0]);
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
    React.render(<SingleProfile data={data} />, $(".sideBar")[0]);
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
var LowerThird = React.createClass({
  componentDidMount: function() {
    this.el = this.getDOMNode();
    this.$el = $(this.el);

    var tl = new TimelineLite();

    tl.to($('.lowerThird'), 0.25, {css: {bottom: "20vh"}}, 0.5);
    tl.to($('.lowerThird'), 0.1, {css: {padding: "1.5vh 1vw"}});

    tl.to($('.lowerThird'), 0.75, {css: {width: "60vw"}})
      .to($('.event'), 0.75, {css: {width: "100%", opacity: "1"}}, '-=0.5')
      .to($('strong'), 0.75, {css: {width: "100%", opacity: "1"}}, '-=1.25')
      .to($('.event'), 0.75, {css: {fontSize: "28px"}})
      .to($('.strap'), 0, {css: {width: "100%"}})
      .to($('.strap'), 0.75, {css: {opacity: "1"}});
  },
  componentWillUnmount: function() {

    var tl = new TimelineLite();

    tl.to($('.lowerThird'), 0.25, {autoAlpha: 0}, 0.5);
    console.log("componentWillUnmount")
  },
  render: function() {
    return (
      <div className='lowerThird'>
        <h3 className='event'>{ this.props.data.eventName } <strong>2015</strong></h3>
        <h1 className='strap'>{ this.props.data.name } - { this.props.data.position }</h1>
      </div>
    );
  }
});
var LowerThirdEvent = React.createClass({
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.event'), 0.5, {autoAlpha:1}, 8);
  },
  render: function() {
    return <h3 className="event">{ this.props.eventName } <strong>2015</strong></h3>;
  }
});
var LowerThirdStrap = React.createClass({
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.strap'), 0.5, {autoAlpha:1});
  },
  render: function() {
    return <h1 className="strap">{ this.props.name } - { this.props.position }</h1>;
  }
});
var ReactTransitionGroup = React.addons.TransitionGroup;

var SingleProfile = React.createClass({
  render: function() {
    return (
      <div>
        <ReactTransitionGroup  transitionName="test" className="singleProfile" component="div">
          <SingleProfileList data={this.props.data} />
        </ReactTransitionGroup>
      </div>
    );
  }
});
var SingleProfileList = React.createClass({
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
            <SingleProfileNode key={person.uid} data={person} />
        );
    });
    return (
      <ReactTransitionGroup  transitionName="singleProfileList" className='singleProfileList col-md-12' component='div'>
        {peopleNodes}
      </ReactTransitionGroup>
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

var SingleProfileManifesto = React.createClass({
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.one'), 0.5, {autoAlpha:1}, 8);
    tl.to($('.two'), 10, {autoAlpha:1}, 8);
  },
  render: function() {
    return (
      <div className='manifesto'>
        <h2 className='text-center'>Manifesto</h2>
        <ul>
          <li><h3 className='one'>{ this.props.manifesto.one }</h3></li>
          <li><h3 className='two'>{ this.props.manifesto.two }</h3></li>
          <li><h3 className='three'>{ this.props.manifesto.three }</h3></li>
        </ul>
      </div>
    )
  }
});
var SingleProfileName = React.createClass({
  render: function() {
    return (
      <h1 className='text-center'>{ this.props.name }</h1>
    )
  }
});
var SingleProfileNode = React.createClass({
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
      <div className={DivClass} data-id={ this.props.data.uid }>
        <SingleProfileName name={this.props.data.name} />
        <SingleProfilePosition position={this.props.data.position} />
        
        <SingleProfilePicture cname={this.props.manifesto} img={this.props.data.img} alt={this.props.data.name} />

        <SingleProfileManifesto manifesto={this.props.data.manifestoPoints} />
      </div> 
    );
  }
});
var SingleProfilePicture = React.createClass({
  render: function() {
    return (
      <div className={ this.props.cname }>
        <img src={ this.props.img } alt={ this.props.alt } />
      </div>
    )
  }
});
var SingleProfilePosition = React.createClass({
  render: function() {
    return (
      <h2 className='text-center'>{ this.props.position }</h2>
    )
  }
});