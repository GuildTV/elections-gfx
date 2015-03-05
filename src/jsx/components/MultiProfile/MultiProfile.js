var MultiProfile = React.createClass({
  render: function() {
    var divClass = 'multiProfile ';
    switch(this.props.peopleCount){
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

    var imageDivClass = 'image ' + this.props.data.pid + ' text-center';
    var imageUrl = 'public/img/roles/' + this.props.data.pid + '/' + this.props.data.uid + '.png';

    return (
      <div className={ divClass } data-id={ this.props.data.uid }>
        <h1 className='text-center'>{ this.props.data.first.toUpperCase() } <strong>{ this.props.data.last.toUpperCase() }</strong></h1>
        <div className={ imageDivClass }>
          <img src={ this.props.data.img } />
        </div>
        <h1 className='text-center'>{ this.props.data.name }</h1>
      </div> 
    );
  }
});