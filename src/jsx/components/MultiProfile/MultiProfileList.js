var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MultiProfileList = React.createClass({
  componentDidMount: function() {
    var tl = new TimelineLite();
    var node = $(this.getDOMNode());

    //align all the stuff
    var peopleDiv = node.find('.people');
    var people = peopleDiv.find('.multiProfile');

    // var available = node.height() - node.find('.title').outerHeight();
    // available -= peopleDiv.outerHeight();
    // available /= 2;
    // peopleDiv.css('margin', available+'px 0');

    switch(people.length){
      case 5:
        $(people[0]).addClass('col-md-offset-1');
        peopleDiv.addClass('ppl-6-5');
        break;
      case 6:
        peopleDiv.addClass('ppl-6-5');
        break;
      case 2:
        $(people[0]).addClass('col-md-offset-2');
        peopleDiv.addClass('ppl-4-3-2-1');
        break;
      case 1:
        $(people[0]).addClass('col-md-offset-4');
        peopleDiv.addClass('ppl-4-3-2-1');
        break;
      case 3:
      case 4:
        peopleDiv.addClass('ppl-4-3-2-1');
        break;
    }

    var o = node;

    tl.to(o.find('h1'), 0.6, {top: "0px"}, "+=0.5");
  },

  render: function() {    
    var peopleCount = this.props.people.length;
    var peopleNodes = this.props.people.map(function (person) {
      return this.renderThumbnail(person, peopleCount);
    }, this);
    return (
      <div className='multiProfileOuter' key={this.props.title}>
        <h1 className='title'>{ this.props.title.toUpperCase() }</h1>
        <div className="people col-md-10 col-md-offset-1">
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
      <div className={ divClass } data-id={ person.uid } key={ person.uid }>
        <div className={ imageDivClass }>
          <img src={ imageUrl } />
        </div>
        <h1 className='text-center'>{ person.first.toUpperCase() }<br/><strong>{ person.last.toUpperCase() }</strong></h1>
      </div> 
    );
  }
});
