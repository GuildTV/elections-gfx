var LowerThirdEvent = React.createClass({
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.event'), 0.5, {autoAlpha:1}, 8);
  },
  render: function() {
    return <h3 className="event">{ this.props.eventName } <strong>2015</strong></h3>;
  }
});