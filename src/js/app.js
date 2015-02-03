var App = {
  scenes: [],
  currentScene: undefined,
  topBarIsRendered: false,
  
  setup: function() {
  },

  loadScene: function(scene, template, id) {
    var data = App.findDataById(id);
    if(data === undefined)
      return;

    App.scenes[scene].render(data);
    currentScene = scene;
  },

  updateScene: function(action, template, id){
    var data = App.findDataById(id);
    if(data === undefined)
      return;

    App.scenes[currentScene].update(template, data);
  },

  stopScene: function(scene, callback){
    App.scenes[scene].stop(callback);
    currentScene = undefined;
  },

  changeScene: function(currentScene, nextScene, template, id) {
    App.stopScene(currentScene, function(){
      App.loadScene(nextScene, template, id);
    });
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
};