var LowerThird = React.createClass({displayName: "LowerThird",
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

    tl.to($('.lowerThird'), 0.25, {css: {bottom: "20vh"}}, 0.5);
    tl.to($('.lowerThird'), 0.1, {css: {padding: "1.5vh 1vw"}});

    tl.to($('.lowerThird'), 0.75, {css: {width: "60vw"}})
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
      React.createElement("div", {className: "lowerThird"}, 
        React.createElement("h3", {className: "event"},  this.props.data.eventName, " ", React.createElement("strong", null, "2015")), 
        React.createElement("h1", {className: "strap"},  this.props.data.name, " - ",  this.props.data.position)
      )
    );
  }
});