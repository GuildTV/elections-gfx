function update(str){
  var data = xmlToObject(str);

  var winners = !data.name;
  var name = winners?"":data.name;
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
  
  var smallest = 1;

  if(winners)
    peopleDiv.classList.add('winners');

  var profiles = peopleDiv.querySelectorAll('.multiProfile');
  for(var i = 0; i < profiles.length; i++){
    var node = profiles[i];
    var person = people[i];

    if(person === undefined){
      peopleDiv.removeChild(node);
      continue;
    }

    node.querySelector('img').setAttribute('src', "public/img/roles/"+person.pid+"/"+person.uid+".png");

    if(winners){
      node.querySelector('h1').innerText = (person.first.toUpperCase() + " " + person.last.toUpperCase()).trim();
      node.querySelector('h2').innerText = person.position_short.toUpperCase();
    } else {
      node.querySelector('h1').innerText = person.first.toUpperCase();
      node.querySelector('h2').innerText = person.last.toUpperCase();
    }
  }
}

function play(){
  animate();
}

function stop(){
  document.body.style.visibility = "hidden";
}

function letterSpacing(){
  
  var profiles = document.querySelectorAll('.multiProfile');
  for(var i = 0; i < profiles.length; i++){
    var node = profiles[i];
	
    var h1 = node.querySelector('h1');
    var h2 = node.querySelector('h2')
	
	var space1 = (h1.clientWidth-h1.scrollWidth)/(h1.textContent.length-1);
	var space2 = (h2.clientWidth-h2.scrollWidth)/(h2.textContent.length-1);
    	
	if(space1 < 0)
		h1.style.letterSpacing = space1+"px";
	if(space2 < 0)
		h2.style.letterSpacing = space2+"px";
	
  }
}

function animate(){
  var tl = new TimelineLite();

  setTimeout(letterSpacing, 50);

  document.body.style.visibility = "visible";

  var elm = document.querySelectorAll('.multiProfile div.name');

  tl.to(elm, 0.6, {top: "0px"})
    .to(elm, 0.2, {autoAlpha: 1}, '-=0.6');
}