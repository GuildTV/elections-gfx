App.widgets['Twitter'] = {
  render: function(data) {
    React.render(<Twitter data={data} />, $(".twitterContainer")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    Twitter.animateOut();

    if(callback !== undefined)
      callback();
  }
};