var SingleProfileManifesto = React.createClass({
  componentDidMount: function() {
    var tl = new TimelineLite();

    tl.to($('.one'), 0.5, {autoAlpha:1}, 8);
    tl.to($('.two'), 10, {autoAlpha:1}, 8);
  },
  render: function() {
    return (
      <div className='manifesto'>
        <h2 className='text-center'>Manifesto</h2>
        <ul>
          <li><h3 className='one'>{ this.props.manifesto.one }</h3></li>
          <li><h3 className='two'>{ this.props.manifesto.two }</h3></li>
          <li><h3 className='three'>{ this.props.manifesto.three }</h3></li>
        </ul>
      </div>
    )
  }
});