var Time = React.createClass({
  updateClock: function() {
    var currentTime = new Date ( );
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds ( );

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes;          
    
    this.setState({time: currentTimeString});
          
  },
  getInitialState: function() {
    return {time: ""};
  },
  componentDidMount: function() {
    this.updateClock()
    setInterval(this.updateClock, 1000);
  },
  render: function() {
    return (
      <div className='time col-md-4' >
        { this.state.time } 
      </div>
    );
  }
})