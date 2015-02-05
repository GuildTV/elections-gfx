App.widgets['lowerThird'] = {
  render: function(data) {

    var $lowerThird = $(".lowerThirdContainer");

    data['eventName'] = App.eventName;

    $lowerThird.html(App.templates.lowerThird(data));
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();
  }
};