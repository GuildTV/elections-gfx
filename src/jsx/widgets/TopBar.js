App.widgets['TopBar'] = {
  render: function(data) {
    React.render(<TopBar />, $(".topBarContainer ")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    TopBar.animateOut();

    if(callback !== undefined)
      callback();
  }
};