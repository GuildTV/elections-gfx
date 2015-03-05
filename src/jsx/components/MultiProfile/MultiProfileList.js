var MultiProfileList = React.createClass({
  getInitialState: function() {
    return {people: [], roleName:"Selection of Candidates" };
  },
  animateIncomingNodeIn: function() {
    var incoming = $('.incoming:first'),
        centrePoint = ( $(window).height() - incoming.outerHeight() )/2,
        tl = new TimelineLite({});

    tl.to(incoming, 1, {bottom:centrePoint});
  },
  animateCurrentNodeOut: function() {
    var current = $('.current'),
    tl = new TimelineLite({onComplete: this.animateIncomingNodeIn()});

    tl.to(current, 1, {top:150});
  },
  componentDidMount: function() {
    var multiProfileOuter = $('.multiProfileOuter'),
        tl = new TimelineLite();

    //align all the stuff
    var peopleDiv = multiProfileOuter.find('.people');
    var available = multiProfileOuter.innerHeight() - multiProfileOuter.find('.title').outerHeight();
    available -= peopleDiv.outerHeight();
    available /= 2;
    peopleDiv.css('margin', available+'px 0');


    TweenLite.set(multiProfileOuter, {autoAlpha:0});
    tl.to(multiProfileOuter, 0.5, {autoAlpha:1});

    this.animateIncomingNodeIn();
  },
  componentWillMount: function() {
    this.state.roleName = this.props.title;

    for(var i in this.props.data){
      this.state.people.push(this.props.data[i]);
    }
    this.state.people.push(this.props.data[0]);
    this.state.people.push(this.props.data[0]);
    this.state.people.push(this.props.data[0]);
  },
  render: function() {
    var peopleNodes = this.state.people.map(function (person) {
      return (
        <MultiProfile key={person.uid+Math.random()} state={person.state} data={person} />
      );
    });
    return (
      <div className='multiProfileOuter col-md-10 col-md-offset-1'>
      <h1 className='title'>{ this.state.roleName }</h1>
        <div className="people col-lg-12">
          { peopleNodes }
        </div>
      </div>
    );
  },
  cycleNodes: function(incoming) {
    var incoming  = $('.incoming:first'),
        current   = $('.current:first'),
        outgoing  = $('.outgoing:first');

    if (incoming.length > 0)
      App.findDataById(incoming.attr('data-id')).state['MultiProfile'] = "current";
      incoming.addClass('current').removeClass('incoming');
    
    if (current.length > 0)
      App.findDataById(current.attr('data-id')).state['MultiProfile'] = "outgoing";
      incoming.addClass('outgoing').removeClass('current');

    if (outgoing.length > 0)
      App.findDataById(outgoing.attr('data-id')).state['MultiProfile'] = "incoming";
      incoming.addClass('incoming').removeClass('current');

  }
});
