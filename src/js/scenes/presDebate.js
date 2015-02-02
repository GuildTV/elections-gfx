App.scenes['presDebate'] = {
  render: function(data) {
    $(".sideBarContent").html(App.templates.singleProfile(data));
  }, 

  update: function(data){

  },
  
  stop: function(callback) {
    if(callback !== undefined)
      callback();
  }
};
