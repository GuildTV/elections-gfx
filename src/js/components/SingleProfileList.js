var SingleProfileList = React.createClass({
    statics: {
    animateOut: function() {
      var current = $('.current'),
          singleProfileContainer = $('.singleProfileContainer'),
          tl = new TimelineLite();

      tl.to(current, 1, {top:150});
      tl.to(singleProfileContainer, 0.5, {autoAlpha:0});
    }
  },
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
    if (this.props.data['state'] === undefined)
      this.props.data['state'] = {};

    this.props.data.state['SingleProfile'] = "incoming";

    this.state.people.push(this.props.data)
  },
  componentWillLeave: function() {
    this.animateOut();
  },
  render: function() {
    var peopleNodes = this.state.people.map(function (person) {
      return (
        <SingleProfile key={person.uid} state={person.state} data={person} />
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
      App.findDataById(incoming.attr('data-id')).state['SingleProfile'] = "current";
      incoming.addClass('current').removeClass('incoming');
    
    if (current.length > 0)
      App.findDataById(current.attr('data-id')).state['SingleProfile'] = "outgoing";
      incoming.addClass('outgoing').removeClass('current');

    if (outgoing.length > 0)
      App.findDataById(outgoing.attr('data-id')).state['SingleProfile'] = "incoming";
      incoming.addClass('incoming').removeClass('current');

  },
  killTweens: function() {
    TweenLite.killTweensOf(this);
  }
});
