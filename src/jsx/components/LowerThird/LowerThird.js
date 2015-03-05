var LowerThird = React.createClass({
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

      tl.to($('.event'), 0.3, {autoAlpha: 0})
        .to($('.strap'), 0.3, {autoAlpha: 0}, '-=0.3')
        .to($('.lowerThird'), 0.3, {css: {width: "0.5.vw"}}, '-=0.3')
        
      tl.to($('.lowerThird'), 0.3, {css: {bottom: "-20%"}, onComplete: this.kill});
    },
    kill: function() {
      React.unmountComponentAtNode($(".lowerThirdContainer")[0])
    },
  },
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.lowerThird'), 0.5, {css: {bottom: "4.76vh"}}, 0.5);

    tl.to($('.lowerThird'), 0.25, {css: {width: "95vw"}})
      .to($('.event'), 0.25, {css: {opacity: "1", left: "11px"}},'-=0.25')
      .to($('.event'), 0, {css: {webkitFilter: "2px"}},'-=0.125')
      .to($('.event'), 0, {css: {webkitFilter: "none"}},'-=0.075')
      .to($('.event'), 0.4, {css: {fontSize: "34px", top: "10.5px"}}, '+=1.2')
      .to($('.strap'), 0.2, {autoAlpha: 1}, '-=0.2');
  },
  render: function() {
    return (
      <div className='lowerThird'>
        <h3 className='event'>{ this.props.data.eventName.toUpperCase() } <strong>2015</strong></h3>
        <h1 className='strap'>{ this.props.data.first.toUpperCase() } { this.props.data.last.toUpperCase() } - { this.props.data.position.toUpperCase() + (this.props.data.elect?" ELECT":"") }</h1>
      </div>
    );
  }
});

