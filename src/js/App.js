var App = {
  widgets: [],
  loadedWidgets: [],
  eventName: "Guild Elections",
  socket: "",

  setEventName: function(eventName) {
    console.log(eventName);
    App.eventName = eventName;
  },

  connectToWebsocket: function(ip, autoRender) {
    App.socket = io.connect('http://' + ip);
    
    App.socket.on('tweet.use', function (data) {
      console.log(data);
      App.loadWidget('Twitter', data);
    });

    App.socket.on('tweet.stop', function () {
      App.stopWidget('Twitter');
    });
  },

  loadWidget: function(widget, id, params) {
    var data = App.findDataById(id);
    if(data === undefined)
      data = id;

    App.widgets[widget].render(data, params);

    App.loadedWidgets.push(widget);
  },

  updateWidget: function(widget, id){
    var data = App.findDataById(id);
    if(data === undefined)  
      data = id;

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
    var win = typeof(id) === "string" && (id.substr(0,4) == "win-");
    if(win)
      id = id.substr(4);

    for(var i in Data){
      //check we have data
      if(Data[i] === undefined)
        continue;

      //find a role
      if(i == id)
        return Data[i];

      //foreach person
      for(var o in Data[i]){
        if(Data[i][o] !== undefined && Data[i][o].uid == id){
          var dat = Data[i][o];
          if(win)
            dat.elect = true;
          else 
            dat.elect = false;
          return dat;
        }
      }
    }
  },
};
