var LowerThirdWrapper = React.createClass({
  getInitialState: function(){
    return {
      data: false
    };
  },

  changeData: function(newData){
    if(newData && this.state.data && newData.uid == this.state.data.uid)
      return;

    if(newData && !newData.uid)
      return;

    this.setState({ data: newData });
  },

  render: function(){
    var newLT = this.state.data?(<LowerThird key={this.state.data.uid} data={this.state.data} />):(<div></div>);

    return (
      <div>
        <ReactTransitionGroup>
          { newLT }
        </ReactTransitionGroup>
      </div>
    );
  }
});