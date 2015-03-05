var ReactTransitionGroup = React.addons.TransitionGroup;

var SingleProfileList = React.createClass({
  getInitialState: function() {
    return {
      people: [],
      currentNode: "",
    };
  },
  componentDidMount: function() {
    this.el = this.getDOMNode();
    this.$el = $(this.el);

    var tl = new TimelineLite();

    tl.to(this.$el, 1, {autoAlpha:1});
  },
  componentWillMount: function() {
    if (this.props.data['state'] === undefined)
      this.props.data['state'] = {};

    this.props.data.state['SingleProfile'] = "incoming";

    this.state.people.push(this.props.data);

    this.setState({ 
      currentNode: this.props.data.uid
    });
  },
  componentWillLeave: function(done) {
    this.el = this.getDOMNode();
    this.$el = $(this.el);
    console.log("SingleProfileList");
  },
  componentWillUnmount: function() {
    TweenLite.killTweensOf(this);
  },
  componentWillReceiveProps: function(props) {
    this.setState({
      currentNode: props.uid
    });
  },
  render: function() {
    var peopleNodes = this.state.people.map(function (person) {
        return (
            <SingleProfileNode key={person.uid} data={person} />
        );
    });
    return (
      <ReactTransitionGroup  transitionName="singleProfileList" className='singleProfileList col-md-12' component='div'>
        {peopleNodes}
      </ReactTransitionGroup>
    );
  }
});