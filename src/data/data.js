var Data = [];

function findDataById(id){
  for(var i in Data){
    //check we have data
    if(Data[i] === undefined)
      continue;

    //find a role
    if(i == id)
      return Data[i];



    //foreach person
    for(var o in Data[i].people){
      var person = Data[i].people[o];

      if(person !== undefined && person.uid == id){
        
        person.position = Data[i].info;

        return person;
      }
    }
  }
}

function xmlToObject(str){
  var data = {};

  var xml = (new DOMParser()).parseFromString(str,"text/xml");
  var components = xml.querySelectorAll('componentData');

  for(var i=0; i < components.length; i++){
    var node = components[i];
    var id = node.getAttribute('id');

    data[id] = node.querySelector('#text').getAttribute('value');
  }

  return data;
}