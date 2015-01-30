App.scenes['default'] = {
  render: function() {
    App.parts['topBar'].render();
  }, 

  remove: function() {
    App.parts['topBar'].render();
  }
}