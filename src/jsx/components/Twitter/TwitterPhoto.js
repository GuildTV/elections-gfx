var TwitterPhoto = React.createClass({
  componentDidMount: function(){
    console.log("Photo Tweet mounted");
  },
  componentWillUnmount: function(){
    console.log("Photo Tweet unmounted");
  },
  componentWillAppear: function(callback) {
    console.log("Photo Tweet animating");

    var td = $(this.refs.tweet),
        tl = new TimelineLite();

    // ensure the image position is centered
    if(td.find('.twitter_img').length > 0){
      var img = new Image();
      img.onload = function(){
        var imageMargin = ((td.find('.tweet').width() - td.find('.twitter_img_landscape').width())/2)+"px";
        td.find('.twitter_img_landscape').css('left', imageMargin);
      };
      img.src = td.find('.twitter_img')[0].src;
    }

    // ensure the tweet is centered
    var globalLeft = ((1920 - td.width())/2)+"px";
    td.css('left', globalLeft);

    // ensure the twitter logo is vertically centered
    var iconLargeTopPos = (td.find('.tweet').height()/2)+"px";
    td.find('.twitter_logo').css('top', iconLargeTopPos);

    var iconLargeLeftPos = (td.find('.tweet').width()/2)+"px";
    //var iconLeftPos = (td.find('.tweet').width()/2)+"px";//td.find('.tweet').offset().left+"px";

    tl.to(td.find(".twitter_logo"), 0.25, {left: iconLargeLeftPos})// left: "32.5vw"
      .to(td.find(".twitter_logo"), 0.25, {width:"172.8px", left: "86.4px", top: "86.4px"}, "+=0.75") //width: "9vw"
      .to(td.find(".text"), 0.5, {autoAlpha: 1}, "-=0.25")
      .to(td.find(".info"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".twitter_img"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".profile_pic"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".username"), 0.5, {autoAlpha: 1}, "-=0.5")
      .to(td.find(".time_ago"), 0.5, {autoAlpha: 1, onComplete: callback}, "-=0.5");
  },

  //TODO - replace this. needs to be called on changing tweet, instead of other animation
  componentWillEnter: function(callback) {
    console.log("Photo Tweet changing");

    return this.componentWillAppear(callback);
  },

  componentWillLeave: function(callback){
    console.log("Photo Tweet leaving");

    var tl = new TimelineLite();

    //TODO - reverse in animation
    tl.to(this.refs.tweet, 0.3, {autoAlpha: 0, onComplete: callback});
  },

  render: function() {
    var time_ago = "HAODF";
    var media = (this.props.data.entities.media !== undefined && this.props.data.entities.media.length > 0 ?<img className='twitter_img_landscape twitter_img' src={ this.props.data.entities.media[0].media_url } />:"");

    var profile_pic = this.props.data.user.profile_image_url.replace("_normal", "");

    return (
      <div className='tweetOuter'>
        <div className='twitter' ref="tweet">
          <img className='twitter_logo' src="public/img/twitter_white.png" />
          <div className='tweet'>
            <h3 className='text'>{ this.props.data.text }</h3>
              { media }
            <h3 className='info'>
              <div className='profile_pic' style={{ backgroundImage: 'url('+profile_pic+')' }}></div>
              <span className='username'>@{ this.props.data.user.screen_name } ({ this.props.data.user.name }),</span> 
              <span className='time_ago'> { time_ago } ago</span>
            </h3>
          </div>
        </div>
      </div>
    );
  }
});

