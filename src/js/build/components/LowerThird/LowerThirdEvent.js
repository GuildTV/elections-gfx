var LowerThirdEvent = React.createClass({displayName: "LowerThirdEvent",
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.event'), 0.5, {autoAlpha:1}, 8);
  },
  render: function() {
    return React.createElement("h3", {className: "event"},  this.props.eventName, " ", React.createElement("strong", null, "2015"));
  }
});