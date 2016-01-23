function update(str){
  var data = xmlToObject(str);

  var name = data.name?data.name:"";
  delete data.name;

  var people = [];

  for(var i in data){
    people.push(findDataById(data[i]));
  }

  if(people.length == 1 && people[0][0] !== undefined)
    people = people[0];

  //is group of candidates
  if(name){
    var peopleNew = [];
    for(var i = 0; i < people.length; i++){
      var person = people[i];

      if(person.first != "RON")
        peopleNew.push(person);
    }
    people = peopleNew;
  }

  document.querySelector('h1.title').innerText = name.toUpperCase();

  var peopleDiv = document.querySelector('.people');
  peopleDiv.classList.add('count'+people.length);

  var profiles = peopleDiv.querySelectorAll('.multiProfile');
  for(var i = 0; i < profiles.length; i++){
    var node = profiles[i];
    var person = people[i];

    if(person === undefined){
      peopleDiv.removeChild(node);
      continue;
    }

    node.querySelector('img').setAttribute('src', "public/img/roles/"+person.pid+"/"+person.uid+".png");

    var h1 = node.querySelector('h1');
    var h2 = node.querySelector('h2')
    h1.innerText = person.first.toUpperCase();
    h2.innerText = person.last.toUpperCase();

    var scale2 = (h2.clientWidth-15)/h2.scrollWidth;
    var scale1 = (h1.clientWidth-15)/h1.scrollWidth;

    if(scale2 < 1)
      h2.style.webkitTransform = "scale("+scale2+","+scale2+")";
    if(scale1 < 1)
      h1.style.webkitTransform = "scale("+scale1+","+scale1+")";
  }
}

function stop(){
  document.body.style.visibility = "hidden";
}

function animate(){
  var tl = new TimelineLite();

  document.body.style.visibility = "visible";

  var elm = document.querySelectorAll('.multiProfile div.name');

  tl.to(elm, 0.6, {top: "0px"})
    .to(elm, 0.2, {autoAlpha: 1}, '-=0.6');
}