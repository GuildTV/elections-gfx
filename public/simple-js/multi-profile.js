function update(str){
  var xml = (new DOMParser()).parseFromString(str,"text/xml");
  var components = xml.querySelectorAll('componentData');
  str = components[0].childNodes[0].nodeValue

  var data = window.data = JSON.parse(str);

  var winners = !data.position;
  var name = "";

  var people = data.candidates;

  if(!winners){
    name = data.position.fullName;
  }

  if(people.length == 1 && people[0][0] !== undefined)
    people = people[0];

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

    node.querySelector('img').setAttribute('src', person.photo);

    if(winners){
      node.querySelector('h1').innerHTML = (person.firstName.toUpperCase() + "<br />" + person.lastName.toUpperCase()).trim();
      node.querySelector('h2').innerText = person.Position.miniName.toUpperCase();
    } else {
      node.querySelector('h1').innerText = person.firstName.toUpperCase();
      node.querySelector('h2').innerText = person.lastName.toUpperCase();
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