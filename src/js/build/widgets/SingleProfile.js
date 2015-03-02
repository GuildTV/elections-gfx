App.widgets['SingleProfile'] = {
  render: function(data) {
    React.render(React.createElement(SingleProfile, {data: data}), $(".sideBar")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();

    // SingleProfileList.animateOut();
    React.unmountComponentAtNode($(".sideBar")[0]);
  }
};