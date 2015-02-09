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

var LowerThird = React.createClass({
  render: function() {
    return (
      <div className='lowerThird'>
        <h3>{ this.props.data.eventName } <strong>2015</strong></h3>
        <h1>{ this.props.data.name } - { this.props.data.position }</h1>
      </div>
    );
  }
});
var SingleProfile = React.createClass({
  render: function() {
    var divClass = 'singleProfile ' + this.props.data.uid + ' incoming col-md-8 col-md-offset-2'
    var imageDivClass = 'image ' + this.props.data.pid + ' text-center';

    return (
      <div className={ divClass }>
        <h1 className='text-center'>{ this.props.data.name }</h1>
        <h3 className='text-center'>{ this.props.data.position }</h3>
        <div className={ imageDivClass }>
          <img src={ this.props.data.img } alt={ this.props.data.name } />
        </div>
        <h2 className='manifesto text-center'>Manifesto</h2>
        <h4>{ this.props.data.manifestoPoints.one }</h4>
        <h4>{ this.props.data.manifestoPoints.two }</h4>
        <h4>{ this.props.data.manifestoPoints.three }</h4>
      </div> 
    );
  }
});
var SingleProfileList = React.createClass({
  getInitialState: function() {
    return {people: []};
  },
  componentDidMount: function() {
    var singleProfileContainer = $('.singleProfileContainer'),
        tl = new TimelineLite();

    TweenLite.set(singleProfileContainer, {autoAlpha:0});
    tl.to(singleProfileContainer, 0.5, {autoAlpha:1});

    this.animateIncomingNodeIn();
  },
  componentWillMount: function() {
    this.state.people.push(this.props.data)
  },
  render: function() {
    var peopleNodes = this.state.people.map(function (person) {
      return (
        <SingleProfile key={person.uid} data={person} />
      );
    });
    return (
      <div className='singleProfileContainer col-md-12'>
        { peopleNodes }
      </div>
    );
  },
  animateIncomingNodeIn: function() {
    var incoming = $('.incoming:first'),
        centrePoint = ( $(window).height() - $('.incoming:first').outerHeight() )/2,
        tl = new TimelineLite();

    console.log(centrePoint);

    tl.to(incoming, 1, {bottom:centrePoint});
  },
  animateCurrentNodeOut: function() {

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
  }
};
App.widgets['SingleProfile'] = {
  render: function(data) {
    React.render(<SingleProfileList data={data} />, $(".sideBar")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();
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