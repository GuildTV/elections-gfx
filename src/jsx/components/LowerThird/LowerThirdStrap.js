var LowerThirdStrap = React.createClass({
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.strap'), 0.5, {autoAlpha:1});
  },
  render: function() {
    return <h1 className="strap">{ this.props.name } - { this.props.position }</h1>;
  }
});