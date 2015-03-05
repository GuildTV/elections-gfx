var MultiProfile = React.createClass({
  render: function() {
    var divClass = 'multiProfile col-md-2 center-block '
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