var MultiProfile = React.createClass({displayName: "MultiProfile",
  render: function() {
    var divClass = 'multiProfile ' + this.props.state.MultiProfile + ' col-md-8 col-md-offset-2'
    var imageDivClass = 'image ' + this.props.data.pid + ' text-center';

    return (
      React.createElement("div", {className: divClass, "data-id":  this.props.data.uid}, 
        React.createElement("h1", {className: "text-center"},  this.props.data.name), 
        React.createElement("h3", {className: "text-center"},  this.props.data.position), 
        React.createElement("div", {className: imageDivClass }, 
          React.createElement("img", {src:  this.props.data.img, alt:  this.props.data.name})
        )
      ) 
    );
  }
});