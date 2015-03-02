var SingleProfileName = React.createClass({displayName: "SingleProfileName",
  render: function() {
    return (
      React.createElement("h1", {className: "text-center"},  this.props.name)
    )
  }
});