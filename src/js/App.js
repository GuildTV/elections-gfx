var App = {
  widgets: [],
  loadedWidgets: [],
  eventName: "Presidential Debate", // Move this later

  setup: function() {
  },

  loadWidget: function(widget, id) {
    var data = App.findDataById(id);
    if(data === undefined)
      data = undefined;

    App.widgets[widget].render(data);

    App.loadedWidgets.push(widget);
  },

  updateWidget: function(widget, id){
    var data = App.findDataById(id);
    if(data === undefined)
      return;

    App.widgets[widget].update(data);
  },

  stopWidget: function(widget, callback){
    App.widgets[widget].stop(callback);
  },

  changeWidget: function(currentWidget, nextWidget, id) {
    App.stopWidget(currentWidget, function(){
      App.loadWidget(nextWidget, id);
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
