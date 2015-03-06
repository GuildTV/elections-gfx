App.widgets['MultiProfile'] = {
  render: function(data, title) {
    if(data.length <= 0)
      return;
    
    if($(".multiProfileContainer > *").length == 0)
      React.render(<MultiProfileWrap />, $(".multiProfileContainer")[0]);


    React.render(<MultiProfileWrap people={data} title={title} />, $(".multiProfileContainer")[0]);
    //React.render(<MultiProfileWrap />, $(".multiProfileContainer")[0]);
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();

    React.unmountComponentAtNode($(".main")[0]);
  }
};