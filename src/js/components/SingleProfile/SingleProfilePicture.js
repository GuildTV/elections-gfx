var SingleProfilePicture = React.createClass({
  render: function() {
    return (
      <div className={ this.props.cname }>
        <img src={ this.props.img } alt={ this.props.alt } />
      </div>
    )
  }
});