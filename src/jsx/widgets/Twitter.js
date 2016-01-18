App.widgets['Twitter'] = {
  wrapper: null,

  render: function(data) {
    var self = App.widgets['Twitter'];
    if(!self.wrapper)
      self.wrapper = ReactDOM.render(<TwitterWrap />, $(".twitterContainer")[0]);

    self.wrapper.changeData(data);
  }, 

  update: function(data){
    return App.widgets['Twitter'].render(data);
  },

  stop: function(callback) {
    return App.widgets['Twitter'].render(false);

    //TODO - delay the callback

    if(callback !== undefined)
      callback();
  },
};