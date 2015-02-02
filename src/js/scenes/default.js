App.scenes['default'] = {
  render: function(data) {
    $(".sideBar").html(App.templates.topBar(data));
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();
  }
};