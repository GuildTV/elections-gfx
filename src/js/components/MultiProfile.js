var MultiProfile = React.createClass({
  render: function() {
    var divClass = 'multiProfile ' + this.props.state.MultiProfile + ' col-md-8 col-md-offset-2'
    var imageDivClass = 'image ' + this.props.data.pid + ' text-center';

    return (
      <div className={ divClass } data-id={ this.props.data.uid }>
        <h1 className='text-center'>{ this.props.data.name }</h1>
        <h3 className='text-center'>{ this.props.data.position }</h3>
        <div className={ imageDivClass }>
          <img src={ this.props.data.img } alt={ this.props.data.name } />
        </div>
      </div> 
    );
  }
});