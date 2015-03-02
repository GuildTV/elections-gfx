var LowerThird = React.createClass({
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

    tl.to($('.event'), 0, {css: {width: "0%", opacity: "0"}})
      .to($('.strap'), 0, {css: {width: "0%", opacity: "0"}})
      .to($('.lowerThird'), 0.25, {css: {width: "0.5vh", padding: "0"}})
      .to($('.lowerThird'), 0.25, {css: {bottom: "-10%"}, onComplete: this.kill}, "=0.5");
    },
    kill: function() {
      React.unmountComponentAtNode($(".lowerThirdContainer")[0])
    },
  },
  componentDidMount: function() {
    this.el = this.getDOMNode();
    this.$el = $(this.el);

    var tl = new TimelineLite();

    tl.to($('.lowerThird'), 0.25, {css: {bottom: "10vh"}}, 0.5);
    tl.to($('.lowerThird'), 0.1, {css: {padding: "1.5vh 1vw"}});

    tl.to($('.lowerThird'), 0.75, {css: {width: "80vw"}})
      .to($('.event'), 0.25, {css: {width: "100%", opacity: "1"}}, '-=0.5')
      .to($('strong'), 0.25, {css: {width: "100%", opacity: "1"}}, '-=1.25')
      .to($('.event'), 0.5, {css: {fontSize: "28px"}})
      .to($('.strap'), 0, {css: {width: "100%"}})
      .to($('.strap'), 0.5, {css: {opacity: "1"}});
  },
  componentWillUnmount: function() {
    var tl = new TimelineLite();

    tl.to($('.lowerThird'), 0.25, {autoAlpha: 0}, 0.5);
    console.log("componentWillUnmount")
  },
  render: function() {
    return (
      <div className='lowerThird'>
        <h3 className='event'>{ this.props.data.eventName.toUpperCase() } <strong>2015</strong></h3>
        <h1 className='strap'>{ this.props.data.name.toUpperCase() } - { this.props.data.position.toUpperCase() }</h1>
      </div>
    );
  }
});