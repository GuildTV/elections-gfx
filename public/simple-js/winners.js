var source   = $("#template-grid").html();
var template = Handlebars.compile(source);

var container = $('.multiProfileContainer');

function play(){
  var ids = [
    'pres-ron', 
    'ado-ron', 
    'pres-jack', 
    'pres-jack', 
    'pres-jack', 
    'pres-jack', 
    'pres-jack'
  ];

  var people = $.map(ids, findDataById);
  people = $.map(people, function(person){
    person.first = person.first.toUpperCase();
    person.last = person.last.toUpperCase();
    person.position_short = person.position_short.toUpperCase();

    return person;
  });

  var data = {
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
  tl.to($('.multiProfile').find('h1'), 0.6, {top: "0px"})
    .to($('.multiProfile').find('h1'), 0.2, {autoAlpha: 1}, '-=0.6');
}