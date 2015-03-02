var SingleProfilePicture = React.createClass({displayName: "SingleProfilePicture",
  render: function() {
    return (
      React.createElement("div", {className:  this.props.cname}, 
        React.createElement("img", {src:  this.props.img, alt:  this.props.alt})
      )
    )
  }
});