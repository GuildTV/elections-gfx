App.widgets['LowerThird'] = {
  wrapper: null,

  render: function(data) {
    var self = App.widgets['LowerThird'];
    if(!self.wrapper)
      self.wrapper = ReactDOM.render(<LowerThirdWrapper />, $(".lowerThirdContainer")[0]);

    self.wrapper.changeData(data);
  }, 

  update: function(data){
    return App.widgets['LowerThird'].render(data);
  },

  stop: function(callback) {
    return App.widgets['LowerThird'].render(false);

    //TODO - delay the callback

    if(callback !== undefined)
      callback();
  },
};