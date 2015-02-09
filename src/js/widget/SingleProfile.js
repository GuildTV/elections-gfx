App.widgets['SingleProfile'] = {
  render: function(data) {
    React.render(<SingleProfileList data={data} />, $(".sideBar")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();
  }
};