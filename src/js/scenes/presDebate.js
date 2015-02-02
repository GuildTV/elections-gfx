App.scenes['presDebate'] = {
  render: function(data) {
    $(".sideBarContent").html(App.templates.singleProfile(data));
  }, 

  stop: function() {
  }
};
