var MultiProfileWrapper = React.createClass({
  getInitialState: function(){
    return {
      title: false,
      people: false
    };
  },

  changeData: function(title, people){
    if(title && this.state.title && title == this.state.title)
      return;

    this.setState({ 
      title: title,
      people: people
    });
  },

  render: function(){
    var list = this.state.title?(<MultiProfileList key={this.state.title} people={this.state.people} title={this.state.title}/>):(<div></div>);

    App.showHideBlue(!!this.state.data);
    
    return (
      <div>
        <ReactTransitionGroup>
          { list }
        </ReactTransitionGroup>
      </div>
    );
  }
});