App.widgets['MultiProfile'] = {
  render: function(data) {
    React.render(<MultiProfileList data={data} />, $(".sideBar")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();

    React.unmountComponentAtNode($(".sideBar")[0]);
  }
};