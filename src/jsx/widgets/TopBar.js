App.widgets['TopBar'] = {
  render: function(data) {
    React.render(<TopBar/>, $(".topBar")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    TopBar.animateOut();

    if(callback !== undefined)
      callback();
  }
};