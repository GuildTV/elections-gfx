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
