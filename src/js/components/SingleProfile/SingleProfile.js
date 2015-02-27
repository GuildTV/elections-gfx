var ReactTransitionGroup = React.addons.TransitionGroup;

var SingleProfile = React.createClass({
  render: function() {
    return (
      <div>
        <ReactTransitionGroup  transitionName="test" className="singleProfile" component="div">
          <SingleProfileList data={this.props.data} />
        </ReactTransitionGroup>
      </div>
    );
  }
});