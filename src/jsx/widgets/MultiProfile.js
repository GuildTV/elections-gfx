App.widgets['MultiProfile'] = {
  render: function(data) {
    if(data.length <= 0)
      return;
    
    React.render(<MultiProfileList data={data} />, $(".main")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();

    React.unmountComponentAtNode($(".main")[0]);
  }
};