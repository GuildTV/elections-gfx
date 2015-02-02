App.scenes['default'] = {
  render: function() {
    App.parts['topBar'].render();
  }, 

  stop: function() {
    App.parts['topBar'].hide();
  }
}