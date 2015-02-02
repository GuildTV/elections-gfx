App.scenes['default'] = {
  render: function() {
    $(".sideBar").html(App.templates.topBar(data));
  },

  stop: function() {
  }
}