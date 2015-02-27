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
