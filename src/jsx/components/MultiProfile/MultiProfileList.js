var MultiProfileList = React.createClass({
  componentDidMount: function(){
    console.log("MP mounted");
  },
  componentWillUnmount: function(){
    console.log("MP unmounted");
  },

  componentWillEnter: function(callback){
    return this.componentWillAppear(callback);
  },

  componentWillAppear: function(callback) {
    console.log("MP animating");

    var tl = new TimelineLite();

    tl.to(this.refs.outer, 0.5, {autoAlpha: 1}, "+=0.5")
      .to($(this.refs.outer).find('h1'), 0.6, {top: "0px", onComplete: callback}, "-=0.5");
  },

  componentWillLeave: function(callback){
    console.log("MP leaving");

    var tl = new TimelineLite();

    tl.to(this.refs.outer, 0.5, {autoAlpha: 0, onComplete: callback});
  },

  render: function() { 
    console.log(this.props)
    if(!this.props.title || !this.props.people){
      return <div></div>;
    }

    var people = this.props.people;

    people[0].isFirst = true;
    var peopleNodes = people.map(function (person) {
      return this.renderThumbnail(person, people.length);
    }, this);

    var peopleClass = people.length<=4?"ppl-4-3-2-1":"ppl-6-5";

    return (
      <div className='multiProfileOuter' ref="outer">
        <h1 className='title'>{ this.props.title.toUpperCase() }</h1>
        <div className={"people col-md-10 col-md-offset-1 "+peopleClass}>
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

    if(person.isFirst){
      switch(peopleCount){
        case 5:
          divClass += " col-md-offset-1 ";
          break;
        case 2:
          divClass += " col-md-offset-2 ";
          break;
        case 1:
          divClass += " col-md-offset-4 ";
          break;
      }
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
