var SingleProfileNode = React.createClass({displayName: "SingleProfileNode",
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

    return (
      React.createElement("div", {className: DivClass, "data-id":  this.props.data.uid}, 
        React.createElement(SingleProfileName, {name: this.props.data.name}), 
        React.createElement(SingleProfilePosition, {position: this.props.data.position}), 
        
        React.createElement(SingleProfilePicture, {cname: this.props.manifesto, img: this.props.data.img, alt: this.props.data.name}), 

        React.createElement(SingleProfileManifesto, {manifesto: this.props.data.manifestoPoints})
      ) 
    );
  }
});