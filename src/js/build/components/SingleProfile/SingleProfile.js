var ReactTransitionGroup = React.addons.TransitionGroup;

var SingleProfile = React.createClass({displayName: "SingleProfile",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(ReactTransitionGroup, {transitionName: "test", className: "singleProfile", component: "div"}, 
          React.createElement(SingleProfileList, {data: this.props.data})
        )
      )
    );
  }
});