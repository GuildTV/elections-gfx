App.widgets['MultiProfile'] = {
  wrapper: null,

  render: function(people, title) {
    console.log("RENDER", title, people)
    var self = App.widgets['MultiProfile'];
    if(!self.wrapper)
      self.wrapper = ReactDOM.render(<MultiProfileWrapper />, $(".multiProfileContainer")[0]);

    self.wrapper.changeData(title, people);
  }, 

  update: function(people, title){
    return App.widgets['MultiProfile'].render(people, title);
  },

  stop: function(callback) {
    return App.widgets['MultiProfile'].render(false, false);

    //TODO - delay the callback

    if(callback !== undefined)
      callback();
  },
};