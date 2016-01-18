var ReactTransitionGroup = React.addons.TransitionGroup;

var SingleProfile = React.createClass({
  componentDidMount: function(){
    console.log("SP mounted");
  },
  componentWillUnmount: function(){
    console.log("SP unmounted");
  },

  componentWillEnter: function(callback){
    return this.componentWillAppear(callback);
  },

  componentWillAppear: function(callback) {
    console.log("SP animating");

    var tl = new TimelineLite();
    var centrePoint = -( $(window).height() - $(this.refs.profile).outerHeight() )/2;

    tl.to(this.refs.profile, 1, {bottom: centrePoint, autoAlpha:1, onComplete: callback});
  },

  componentWillLeave: function(callback){
    console.log("SP leaving");

    var tl = new TimelineLite();

    tl.to(this.refs.profile, 1, {bottom:"75%", autoAlpha:0, onComplete: callback});
  },

  render: function() {
    if(!this.props.data){
      return <div></div>;
    }

    var isCandidate =  (this.props.data.candidate !== undefined && this.props.data.candidate == true ? "candidate":"");
    var imageUrl = 'public/img/roles/' + this.props.data.pid + '/' + this.props.data.uid + '.png';

    return (
      <div className='singleProfileContainer col-md-12'>
        <div className='singleProfile col-md-10 col-md-offset-1' ref="profile">
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
