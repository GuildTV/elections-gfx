var SingleProfile = React.createClass({
  statics: {
    animateOut: function() {
      var tl = new TimelineLite();

      tl.to($('.event'), 0.3, {autoAlpha: 0})
        .to($('.strap'), 0.3, {autoAlpha: 0}, '-=0.3')
        .to($('.lowerThird'), 0.3, {css: {width: "0.5.vw"}}, '-=0.3')
        
      tl.to($('.lowerThird'), 0.3, {css: {top: "-20%"}, onComplete: this.kill});
    },
    kill: function() {
      React.unmountComponentAtNode($(".sideBar")[0])
    },
  },
  componentDidMount: function() {
    var tl = new TimelineLite(),
        centrePoint = ( $(window).height() - $('.singleProfile').outerHeight() )/2;

    console.log(centrePoint);

    tl.to($('.singleProfile'), 1, {bottom:centrePoint, autoAlpha:1});

  },
  componentWillReceiveProps: function(nextProps) {
    var tl = new TimelineLite();

  },
  render: function() {
    var isCandidate =  (this.props.data.candidate !== undefined && this.props.data.candidate == true ? "candidate":"")
    var imageUrl = 'public/img/roles/' + this.props.data.pid + '/' + this.props.data.uid + '.png';

    return (
      <div className='singleProfileContainer'>
        <div className='singleProfile col-md-10 col-md-offset-1'>
          <h1 className='text-center'>{ this.props.data.first.toUpperCase() } { this.props.data.last.toUpperCase() }</h1>
          <h2 className='text-center'>{ this.props.data.position.toUpperCase() } { isCandidate.toUpperCase() }</h2>

          <img src={ imageUrl } />

          <h2 className='text-center'>MANIFESTO</h2>
          <ul>
            <li><h3 className='one'>{ this.props.data.manifestoPoints.one }</h3></li>
            <li><h3 className='two'>{ this.props.data.manifestoPoints.two }</h3></li>
            <li><h3 className='three'>{ this.props.data.manifestoPoints.three }</h3></li>
          </ul>
        </div>
      </div>
    );
  }
});