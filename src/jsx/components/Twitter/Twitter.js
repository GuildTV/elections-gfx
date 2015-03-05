var Twitter = React.createClass({
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

      tl.to($('.twitter'), 0.3, {autoAlpha: 0, onComplete: this.kill});
    },
    kill: function() {
      React.unmountComponentAtNode($(".twitterContainer")[0])
    },
  },
  componentDidMount: function() {
    var td = $('.twitter'),
        tl = new TimelineLite(),
        centrePoint = ( $(window).height() - td.outerHeight() )/2;


    tl.to(td, 0, {top: centrePoint});

    tl.to(td.find(".twitter_logo"), 0.25, {left:"10vw"})
      .to(td.find(".twitter_logo"), 0.25, {width:"5%", left: 0, top: "5px"}, "+=0.75")
      .to(td.find(".text"), 0.5, {autoAlpha: 1}, "-=0.25")
      .to(td.find(".info"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".twitter_img"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".profile_pic"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".username"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".time_ago"), 0.5, {autoAlpha: 1}, "-=0.5");
  },
  componentWillReceiveProps: function(nextProps) {
    var td = $('.twitter'),
        tl = new TimelineLite();

    tl.to(td.find(".twitter_logo"), 0.25, {width:"50%", left:"10vw"})
      .to(td.find(".text"), 0.5, {autoAlpha: 0}, "-=0.25")
      .to(td.find(".info"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".twitter_img"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".profile_pic"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".username"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td.find(".time_ago"), 0.5, {autoAlpha: 0}, "-=0.5")
      .to(td, 0, {top: ( $(window).height() - td.outerHeight() )/2})
      .to(td.find(".twitter_logo"), 0.25, {width:"5%", left: 0, top: "5px"}, "+=0.75")
      .to(td.find(".text"), 0.5, {autoAlpha: 1}, "-=0.25")
      .to(td.find(".info"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".twitter_img"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".profile_pic"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".username"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".time_ago"), 0.5, {autoAlpha: 1}, "-=0.5");

  },
  render: function() {
    var time_ago = this.timeSince(this.props.data.created_at);
    var media = (this.props.data.entities.media !== undefined && this.props.data.entities.media.length > 0 ?<img className='twitter_img' src={ this.props.data.entities.media[0].media_url } />:"");

    return (
      <div className='twitter'>
        <img className='twitter_logo' src="public/img/twitter_white.png" />
        <div className='tweet'>
          <h3 className='text'>{ this.props.data.text }</h3>
            { media }
          <h3 className='info'><img className='profile_pic' src={ this.props.data.user.profile_image_url } /><span className='username'>@{ this.props.data.user.screen_name } ({ this.props.data.user.name }),</span> <span className='time_ago'>{ time_ago } ago</span></h3>
        </div>
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

