var App = {
  scenes: [],
  currentScene: undefined,
  topBarIsRendered: false,
  
  setup: function() {
  },

  loadScene: function(scene, template, id) {
    var data = App.findDataById(id);
    if(data === undefined)
      return;

    App.scenes[scene].render(data);
    currentScene = scene;
  },

  updateScene: function(template, id){
    var data = App.findDataById(id);
    if(data === undefined)
      return;

    App.scenes[currentScene].update(template, data);
  },

  stopScene: function(scene, callback){
    App.scenes[scene].stop(callback);
    currentScene = undefined;
  },

  changeScene: function(currentScene, nextScene, template, id) {
    App.stopScene(currentScene, function(){
      App.loadScene(nextScene, id);
    });
  },

  findDataById: function(id){
    for(var i in Data){
      if(Data[i] === undefined)
        continue;

      for(var o in Data[i]){
        if(Data[i][o] !== undefined && Data[i][o].uid == id)
          return Data[i][o];
      }
    }
  },
};
/*
 * CASPAR-CG COMMANDS
*/

// CALL 1-1 PLAY
function play(str) {
  // document.getElementById("temp").innerHTML="play2";
  window.templateData = (new DOMParser()).parseFromString(str,"text/xml");
  // init();
}
// CALL 1-1 STOP
function stop(str) {
  // document.getElementById("temp").innerHTML="stop";
  window.templateData = (new DOMParser()).parseFromString(str,"text/xml");
  out();
  // document.getElementById("temp").innerHTML="stop-done";
}
// CALL 1-1 NEXT
function next() {
  // document.getElementById("temp").innerHTML="start next";
  // document.getElementById("temp").innerHTML="end next";
}
// CALL 1-1 REMOVE
function remove() {
  // document.getElementById("temp").innerHTML="remove";
}
// CALL 1-1 UPDATE STRING
function update(str) {
  // document.getElementById("temp").innerHTML="update: " + str.length;
  window.templateData = (new DOMParser()).parseFromString(str,"text/xml");
  init();
  addNext();
}
// CALL 1-1 INVOKE STRING
function invoke(str) {
  eval(str);
}
// CALL 1-1 INVOKE "otherFunction('testing');"
function otherFunction(str) {
  // document.getElementById("lower-third").innerHTML="Other function called with: " + str;
}

//temporary to fake data (for testing in browser)
function fake(){
  update("<templateData><componentData id=\"f0\"><data id=\"text\" value=\"Rob Sumner\" /></componentData><componentData id=\"f1\"><data id=\"text\" value=\"Is better than Julian\" /></componentData><componentData id=\"f2\"><data id=\"text\" value=\"#4455a5\" /></componentData><componentData id=\"f3\"><data id=\"text\" value=\"rollIn\" /></componentData><componentData id=\"f4\"><data id=\"text\" value=\"rollOut\" /></componentData></templateData>");
}
this["App"] = this["App"] || {};
this["App"]["templates"] = this["App"]["templates"] || {};
this["App"]["templates"]["lowerThird"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<h2>"
    + escapeExpression(((helper = (helper = helpers.eventName || (depth0 != null ? depth0.eventName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"eventName","hash":{},"data":data}) : helper)))
    + "</h2>\n<h3>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " -  "
    + escapeExpression(((helper = (helper = helpers.role || (depth0 != null ? depth0.role : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"role","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"useData":true});
this["App"]["templates"]["singleProfile"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "<div class=\"singleProfile col-md-12\">\n  <div class=\"col-md-8 col-md-offset-2\">\n    <h2>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n    <h3>"
    + escapeExpression(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"position","hash":{},"data":data}) : helper)))
    + "</h3>\n    <img src=\""
    + escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n    <h3>Manifesto</h3>\n    <h4>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.manifestoPoints : depth0)) != null ? stack1.one : stack1), depth0))
    + "</h4>\n    <h4>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.manifestoPoints : depth0)) != null ? stack1.two : stack1), depth0))
    + "</h4>\n    <h4>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.manifestoPoints : depth0)) != null ? stack1.three : stack1), depth0))
    + "</h4>\n  </div> <!-- / .col-md-8 .col-md-offset-2 -->\n</div> <!-- / .singleProfile -->\n";
},"useData":true});
this["App"]["templates"]["topBar"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"logos col-md-3\">\n  <img src=\"public/img/logo.png\">\n</div> <!-- / .logo  -->\n<div class=\"twitter col-md-3\">\n  <h1>"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + "</h1>\n</div><!-- / .twitter -->\n<div class=\"text col-md-3\">\n  <h1>"
    + escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"text","hash":{},"data":data}) : helper)))
    + "</h1>\n</div><!-- / .text -->\n<div class=\"col-md-3\">\n<div class=\"logos col-md-3\">\n  <img src=\"public/img/"
    + escapeExpression(((helper = (helper = helpers.logos || (depth0 != null ? depth0.logos : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"logos","hash":{},"data":data}) : helper)))
    + ".png\">\n</div> <!-- / .logos  -->";
},"useData":true});
App.scenes['default'] = {
  render: function(data) {
    $(".sideBar").html(App.templates.topBar(data));
  },

  update: function(data){

  },

  stop: function(callback) {
    if(callback !== undefined)
      callback();
  }
};
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
