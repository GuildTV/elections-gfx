App.scenes['presDebate'] = {
  render: function(data) {
    $(".sideBar").html(App.templates.singleProfile(data));
  }, 

  stop: function() {
  }
}