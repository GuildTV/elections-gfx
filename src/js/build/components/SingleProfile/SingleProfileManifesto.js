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