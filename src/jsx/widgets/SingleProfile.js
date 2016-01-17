App.widgets['SingleProfile'] = {
  render: function(data) {
    ReactDOM.render(<SingleProfile data={data} />, $(".sideBar")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    SingleProfile.animateOut();

    if(callback !== undefined)
      callback();
  }
};