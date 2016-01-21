var source   = $("#template").html();
var template = Handlebars.compile(source);

var container = $('.winningCandidateContainer');

function render(id, additionalData){
  var person = findDataById(id);

  person.first = person.first.toUpperCase();
  person.last = person.last.toUpperCase();
  person.position_short = person.position_short.toUpperCase();
  person.position = person.position.toUpperCase();

  var data = {
    data: additionalData,
    person: person
  };

  container.append(template(data));

  //setTimeout(animate, 100);
}

function stop(){
  container.empty();
}

function animate(){
  var tl = new TimelineLite();
  tl.to($('.multiProfile').find('h1'), 0.6, {top: "0px"})
    .to($('.multiProfile').find('h1'), 0.2, {autoAlpha: 1}, '-=0.6');
}