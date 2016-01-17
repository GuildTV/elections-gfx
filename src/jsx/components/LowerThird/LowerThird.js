var ReactTransitionGroup = React.addons.TransitionGroup;

var LowerThird = React.createClass({
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
      return <div></div>;
    }

    return (
      <div className='lowerThird' ref="lt">
        <h3 className='event' ref="ev">{ App.eventName.toUpperCase() } <strong>2016</strong></h3>
        <h1 className='strap' ref="strap">{ this.props.data.first.toUpperCase() } { this.props.data.last.toUpperCase() } - { this.props.data.position.toUpperCase() + (this.props.data.elect?" ELECT":"") }</h1>
      </div>
    );
  }
});

var LowerThirdWrapper = React.createClass({
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
    var newLT = this.state.data?(<LowerThird key={this.state.data.uid} data={this.state.data} />):(<div></div>);

    return (
      <div>
        <ReactTransitionGroup>
          { newLT }
        </ReactTransitionGroup>
      </div>
    );
  }

});