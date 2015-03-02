var SingleProfilePosition = React.createClass({displayName: "SingleProfilePosition",
  render: function() {
    return (
      React.createElement("h2", {className: "text-center"},  this.props.position)
    )
  }
});