var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MultiProfileWrap = React.createClass({
  render: function() {
    if(this.props.people === undefined || this.props.title === undefined)
      return (
        <div className="multiProfileOuter">
          <ReactCSSTransitionGroup transitionName="fade">
            <div className="multiProfileNode" key="blank" />
          </ReactCSSTransitionGroup>
        </div>
      );

    return (
      <div className="multiProfileOuter">
        <ReactCSSTransitionGroup transitionName="fade">
          <div className="multiProfileNode" key={this.props.title}>
            <MultiProfileList people={this.props.people} title={this.props.title}/>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});          
