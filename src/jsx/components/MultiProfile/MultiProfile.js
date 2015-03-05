var MultiProfile = React.createClass({
  render: function() {
    var divClass = 'multiProfile col-md-3 center-block '
    var imageDivClass = 'image ' + this.props.data.pid + ' text-center';

    return (
      <div className={ divClass } data-id={ this.props.data.uid }>
        <h1 className='text-center'>{ this.props.data.name }</h1>
        <div className={ imageDivClass }>
          <img src={ this.props.data.img } alt={ this.props.data.name } />
        </div>
      </div> 
    );
  }
});