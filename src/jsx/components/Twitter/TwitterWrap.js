var ReactTransitionGroup = React.addons.TransitionGroup;

var TwitterWrap = React.createClass({
  getInitialState: function(){
    return {
      data: false
    };
  },

  changeData: function(newData){
    if(newData && this.state.data && newData.id == this.state.data.id)
      return;

    if(newData && !newData.id)
      return;

    this.setState({ data: newData });
  },

  render: function(){
    var tweet = <div></div>;
    if(this.state.data && this.state.data.img)
      tweet = <TwitterPhoto key={this.state.data.id} data={this.state.data} />;
    else if (this.state.data)
      tweet = <Twitter key={this.state.data.id} data={this.state.data} />;

    return (
      <div>
        <ReactTransitionGroup>
          { tweet }
        </ReactTransitionGroup>
      </div>
    );
  }
});