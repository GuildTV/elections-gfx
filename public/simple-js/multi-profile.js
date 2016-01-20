var source   = $("#template-grid").html();
var template = Handlebars.compile(source);

var container = $('.multiProfileContainer');

function play(){
  var people = findDataById("president");
  var data = {
    title: "NTOESG",
    people: people
  };

  container.append(template(data));

  setTimeout(animate, 100);
}

function stop(){
  container.empty();
}

function animate(){
  var tl = new TimelineLite();
  tl.to($('.multiProfile').find('h1'), 0.6, {top: "0px"});
}