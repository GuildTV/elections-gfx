var SingleProfileNode = React.createClass({
  componentDidMount: function() {
    this.el = this.getDOMNode();
    this.$el = $(this.el);

    console.log("componentDidMount");

   
    var centrePoint = ( $(window).height() - this.$el.outerHeight() )/2,
        tl = new TimelineLite();

    tl.to(this.$el, 1, {bottom:centrePoint, autoAlpha:1});
  },
  componentWillLeave: function(cb) {
    this.el = this.getDOMNode();
    this.$el = $(this.el);

    var tl = new TimelineLite();

    tl.to(this.$el, 1, {bottom:"105%"});
    tl.to(this.$el, 0.5, {autoAlpha:0});
  },
  render: function() {
    var DivClass = 'singleProfileNode col-md-10 col-md-offset-1 ' + this.props.data.state['SingleProfile'];
    var isCandidate =  (this.props.data.candidate !== undefined && this.props.data.candidate == true)
    return (
      <div className={DivClass} data-id={ this.props.data.uid }>
        <SingleProfileName first={this.props.data.first} last={this.props.data.last}  />
        <SingleProfilePosition position={this.props.data.position} isCandidate={ isCandidate } />
        
        <SingleProfilePicture cname={this.props.manifesto} pid={this.props.data.pid} uid={this.props.data.uid} />

        <SingleProfileManifesto manifesto={this.props.data.manifestoPoints} />
      </div> 
    );
  }
});