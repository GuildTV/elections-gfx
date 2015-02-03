App.scenes['presDebate'] = {
  eventName: "Presidential Debate",

  render: function(template, data) {
    if (App.topBarIsRendered == false) {
      $(".topBar").html(App.templates.topBar());
      App.topBarIsRendered = true;
    };
    if (template == "lowerThird") {
      data.push(name: eventName)
    },

    $(".sideBarContent").html(App.templates.template(data));
  }, 

  update: function(template, data){

  },
  
  stop: function(callback) {
    if(callback !== undefined)
      callback();
  }
};
