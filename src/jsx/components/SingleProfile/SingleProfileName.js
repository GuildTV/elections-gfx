var SingleProfileName = React.createClass({
  render: function() {
    return (
      <h1 className='text-center'>{ this.props.first.toUpperCase() } { this.props.last.toUpperCase() }</h1>
    )
  }
});