var SingleProfilePosition = React.createClass({
  render: function() {
    return (
      <h2 className='text-center'>{ this.props.position.toUpperCase() } { (this.props.isCandidate == true ? "CANDIDATE": "") }</h2>
    )
  }
});