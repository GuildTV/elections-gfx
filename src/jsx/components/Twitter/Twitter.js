var Twitter = React.createClass({
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

      // onComplete: this.kill
    },
    kill: function() {
      React.unmountComponentAtNode($(".twitterContainer")[0])
    },
  },
  componentDidMount: function() {
    var tl = new TimelineLite(),
        centrePoint = ( $(window).height() - $(".twitter").outerHeight() )/2

    tl.to($(".twitter"), 0, {top: centrePoint});

    tl.to($(".twitter_logo"), 0.25, {left:"10vw", top: "5vw"})
      .to($(".twitter_logo"), 0.25, {width:"5%", left: 0, top: "5px"}, "+=0.75")
      .to($(".text"), 0.5, {autoAlpha: 1, ease: Power2.easeInOut}, "-=0.25")
      .to($(".info"), 0.5, {autoAlpha: 1, ease: Power2.easeInOut}, "-=0.5")
      .to($(".twitter_img"), 0.5, {autoAlpha: 1, ease: Power2.easeInOut}, "-=0.5")
      .to($(".profile_pic"), 0.5, {autoAlpha: 1, ease: Power2.easeInOut}, "-=0.5")
      .to($(".username"), 0.5, {autoAlpha: 1, ease: Power2.easeInOut}, "-=0.5")
      .to($(".time_ago"), 0.5, {autoAlpha: 1, ease: Power2.easeInOut}, "-=0.5");
  },
  render: function() {
    time_ago = this.timeSince(this.props.data.created_at)

    return (
      <div className='twitter'>
        <img className='twitter_logo' src="public/img/twitter_white.png" />
        <h3 className='text'>{ this.props.data.text }</h3>
        <img className='twitter_img' src={ this.props.data.img } />
        <h3 className='info'><img className='profile_pic' src={ this.props.data.profile_pic } /><span className='username'>@{ this.props.data.username },</span> <span className='time_ago'>{ time_ago } ago</span></h3>
      </div>
    );
  },
  timeSince: function(date) {
    tdate = new Date(date)
    var seconds = Math.floor((new Date() - tdate) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
});

