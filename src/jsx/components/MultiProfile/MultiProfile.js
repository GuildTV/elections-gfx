var MultiProfile = React.createClass({
  render: function() {
    var divClass = 'multiProfile col-md-2 center-block '
    var imageDivClass = 'image ' + this.props.data.pid + ' text-center';
    var imageUrl = 'public/img/roles/' + this.props.data.pid + '/' + this.props.data.uid + '.png';

    return (
      <div className={ divClass } data-id={ this.props.data.uid }>
        <div className={ imageDivClass }>
          <img src={ imageUrl } alt={ this.props.data.name } />
        </div>
        <h1 className='text-center'>{ this.props.data.name }</h1>
      </div> 
    );
  }
});