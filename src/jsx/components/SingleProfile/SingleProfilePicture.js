var SingleProfilePicture = React.createClass({
  render: function() {
    var imageUrl = 'public/img/roles/' + this.props.pid + '/' + this.props.uid + '.png';
    
    return (
      <div className={ this.props.cname }>
        <img src={ imageUrl } alt={ this.props.alt } />
      </div>
    );
  }
});