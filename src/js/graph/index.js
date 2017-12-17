require("sass/graph/app.scss");

import Graphs from './graph.js';

window.stop = function(){
  document.querySelector('body').style.display = "none";
};

window.play = function(){
  Graphs.startScraping();
};

window.update = function(str){
  const xml = (new DOMParser()).parseFromString(str, "text/xml");
  const server = window.apiUrl = xml.querySelector('#server #text').getAttribute('value');
  const interval = window.apiInterval = parseInt(xml.querySelector('#interval #text').getAttribute('value'));

  console.log(server, interval);
};

if (window.location.hash.indexOf("dev") != -1){
  console.log("DEV MODE");

  document.body.classList.add("dev");

  window.devConnect = function(){
    Graphs.stopScraping();
    window.apiUrl = document.querySelector("#devUrl").value;
    window.apiInterval = document.querySelector("#devInterval").value;
    window.play();
  };
}
