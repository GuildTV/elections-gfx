var App = {
  scenes: [],
  currentScene: undefined,
  
  setup: function() {
  },

  loadScene: function(scene, id) {
    var data = App.findDataById(id);
    if(data === undefined)
      return;

    App.scenes[scene].render(data);
    App.currentScene = scene;
  },

  stopScene: function(scene){
    App.scenes[scene].stop();
  },

  changeScene: function(nextScene, currentScene) {

  },

  findDataById: function(id){
    for(var i in Data){
      if(Data[i] === undefined)
        continue;

      for(var o in Data[i]){
        if(Data[i][o] !== undefined && Data[i][o].uid == id)
          return Data[i][o];
      }
    }
  },
}