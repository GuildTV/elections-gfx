var SingleProfile = React.createClass({
  render: function() {
    var divClass = 'singleProfile ' + this.props.data.uid + ' incoming col-md-8 col-md-offset-2'
    var imageDivClass = 'image ' + this.props.data.pid + ' text-center';

    return (
      <div className={ divClass }>
        <h1 className='text-center'>{ this.props.data.name }</h1>
        <h3 className='text-center'>{ this.props.data.position }</h3>
        <div className={ imageDivClass }>
          <img src={ this.props.data.img } alt={ this.props.data.name } />
        </div>
        <h2 className='manifesto text-center'>Manifesto</h2>
        <h4>{ this.props.data.manifestoPoints.one }</h4>
        <h4>{ this.props.data.manifestoPoints.two }</h4>
        <h4>{ this.props.data.manifestoPoints.three }</h4>
      </div> 
    );
  }
});