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

    window.dfsdf = node;
    node.querySelector('img').setAttribute('src', "public/img/roles/"+person.pid+"/"+person.uid+".png");
    node.querySelector('h1').innerHTML = person.first.toUpperCase()+"<br/><strong>"+person.last.toUpperCase()+"</strong>";
  }

  //setTimeout(animate, 100);
  animate();
}

function stop(){
  document.body.style.display = "none";
}

function animate(){
  var tl = new TimelineLite();

  document.body.style.display = "block";
  
  var elm = document.querySelectorAll('.multiProfile h1');

  tl.to(elm, 0.6, {top: "0px"})
    .to(elm, 0.2, {autoAlpha: 1}, '-=0.6');
}