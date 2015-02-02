var App = {
  scenes: [],
  currentScene: null,
  
  setup: function() {
  },

  loadScene: function(scene, data) {
    App.scene[scene].render(data);
  },

  changeScene: function(nextScene, currentScene) {

  },
}