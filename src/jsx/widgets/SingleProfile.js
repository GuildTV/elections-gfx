App.widgets['SingleProfile'] = {
  wrapper: null,

  render: function(data) {
    var self = App.widgets['SingleProfile'];
    if(!self.wrapper)
      self.wrapper = ReactDOM.render(<SingleProfileWrapper />, $(".sideBar")[0]);

    self.wrapper.changeData(data);
  },

  update: function(data){
    return App.widgets['SingleProfile'].render(data);
  },

  stop: function(callback) {
    return App.widgets['SingleProfile'].render(false);

    //TODO - delay the callback

    if(callback !== undefined)
      callback();
  }
};
