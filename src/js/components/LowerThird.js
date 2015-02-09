var LowerThird = React.createClass({
  render: function() {
    return (
      <div className='lowerThird'>
        <h3>{ this.props.data.eventName } <strong>2015</strong></h3>
        <h1>{ this.props.data.name } - { this.props.data.position }</h1>
      </div>
    );
  }
});