var TopBar = React.createClass({
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

      tl.to($('.singleProfile'), 1, {bottom:"75%", autoAlpha:0, onComplete: this.kill});
    },
    kill: function() {
      React.unmountComponentAtNode($(".topBarContainer")[0])
    },
  },
  componentDidMount: function() {
    var tl = new TimelineLite(),
        centrePoint = -( $(window).height() - $('.singleProfile').outerHeight() )/2;

    tl.to($('.singleProfile'), 1, {bottom: centrePoint, autoAlpha:1});
  },
  componentWillReceiveProps: function(nextProps) {
    var tl = new TimelineLite();
  },
  render: function() {
    return (
      <div className='topBar col-md-14'>
        <Time />
      </div>
    );
  }
});