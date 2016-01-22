var source   = $("#template-grid").html();
var template = Handlebars.compile(source);

var container = $('.multiProfileContainer');

function update(str){
  var data = xmlToObject(str);

  var name = data.name?data.name:"";
  delete data.name;

  people = $.map(data, function(v, i){
    return findDataById(v);
  });

  //is group of candidates
  if(name){
    people = $.grep(people, function(person){
      return person.first != "RON";
    });
  }

  people = $.map(people, function(person){
    person.first = person.first.toUpperCase();
    person.last = person.last.toUpperCase();
    person.position_short = person.position_short.toUpperCase();

    return person;
  });

  var data = {
    title: name.toUpperCase(),
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