var SingleProfileWrapper = React.createClass({
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
    var profile = this.state.data?(<SingleProfile key={this.state.data.uid} data={this.state.data} />):(<div></div>);

    return (
      <div>
        <ReactTransitionGroup>
          { profile }
        </ReactTransitionGroup>
      </div>
    );
  }
});