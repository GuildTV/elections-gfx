App.widgets['LowerThird'] = {
  render: function(data) {
    data['eventName'] = App.eventName;
    React.render(<LowerThird data={data} />, $(".lowerThirdContainer")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();
  }
};