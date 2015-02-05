App.widgets['singleProfile'] = {
  render: function(data) {
    var $sideBar = $(".sideBar")
    $sideBar.html(App.templates.singleProfile(data));
  }, 

  update: function(data){

  },
  
  stop: function(callback) {
    if(callback !== undefined)
      callback();
  }
};
