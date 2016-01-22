var Data = [];

function findDataById(id){
  var win = typeof(id) === "string" && (id.substr(0,4) == "win-");
  if(win)
    id = id.substr(4);

  for(var i in Data){
    //check we have data
    if(Data[i] === undefined)
      continue;

    //find a role
    if(i == id)
      return Data[i];

    //foreach person
    for(var o in Data[i]){
      if(Data[i][o] !== undefined && Data[i][o].uid == id){
        var dat = Data[i][o];
        if(win)
          dat.elect = true;
        else 
          dat.elect = false;
        return dat;
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