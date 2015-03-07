var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TwitterWrap = React.createClass({
  render: function() {
    if(this.props.data === undefined )
      return (
        <div className="twitterOuter">
          <ReactCSSTransitionGroup transitionName="fade">
            <div className="twitterNode" key="blank" />
          </ReactCSSTransitionGroup>
        </div>
      );

    return (
      <div className="twitterOuter">
        <ReactCSSTransitionGroup transitionName="fade">
          <div className="twitterNode" key={this.props.data.id}>
            <Twitter data={this.props.data} />
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});          
