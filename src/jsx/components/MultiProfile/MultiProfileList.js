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
    var people = peopleDiv.find('.multiProfile');
    peopleDiv.find('img').each(function(i,v){
      v = $(v);
      v.css('height', v.outerWidth()+"px");
    });

    var available = multiProfileOuter.innerHeight() - multiProfileOuter.find('.title').outerHeight();
    available -= peopleDiv.outerHeight();
    available /= 2;
    peopleDiv.css('margin', available+'px 0');

    switch(people.length){
      case 5:
        $(people[0]).addClass('col-md-offset-1');
        break;
      case 2:
        $(people[0]).addClass('col-md-offset-2');
        break;
      case 1:
        $(people[0]).addClass('col-md-offset-4');
        break;
    }

    var o = multiProfileOuter;

    TweenLite.set(o, {autoAlpha:0});
    tl.to(o, 0.5, {autoAlpha:1})
      .to(o.find('h1'), 0.6, {top: "0px"}, "-=0.5");

    // this.animateIncomingNodeIn();
  },
  componentWillReceiveProps: function(nextProps) {
    var o = $('.multiProfileOuter'),
        tl = new TimelineLite();

    tl.to(o, 0.5, {autoAlpha: 0})
      .to(o, 0.5, {autoAlpha: 1});

  },
  componentDidUpdate: function() {
    // setTimeout(this.componentDidMount, 400);
  },
  render: function() {
    var peopleCount = this.props.people.length;
    var peopleNodes = this.props.people.map(function (person) {
      return this.renderThumbnail(person, peopleCount);
    }, this);
    return (
      <div className='multiProfileOuter col-md-10 col-md-offset-1'>
      <h1 className='title'>{ this.props.title.toUpperCase() }</h1>
        <div className="people col-lg-12">
          { peopleNodes }
        </div>
      </div>
    );
  },

  renderThumbnail: function(person, peopleCount){
    var divClass = 'multiProfile ';
    switch(peopleCount){
      case 6:
      case 5:
        divClass += "col-md-2 ";
        break;
      case 4:
        divClass += "col-md-3 ";
        break;
      case 3:
      case 2:
      case 1:
        divClass += "col-md-4 ";
        break;
    }

    var imageDivClass = 'image ' + person.pid + ' text-center';
    var imageUrl = 'public/img/roles/' + person.pid + '/' + person.uid + '.png';

    return (
      <div className={ divClass } data-id={ person.uid }>
        <div className={ imageDivClass }>
          <img src={ imageUrl } />
        </div>
        <h1 className='text-center'>{ person.first.toUpperCase() }<br/><strong>{ person.last.toUpperCase() }</strong></h1>
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
