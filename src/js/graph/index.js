require("sass/graph/app.scss");

import Graphs from './graph.js';

window.stop = function(){
  document.querySelector('body').style.display = "none";
};

window.play = function(){
  Graphs.startScraping();
};

window.update = function(str){
  // const xml = (new DOMParser()).parseFromString(str, "text/xml");

  // const server_elm = xml.querySelector('#server_url #text')
  // const interval_elm = xml.querySelector('#interval #text')

  // if (!server_elm || !interval_elm) {
  //   console.log("Bad xml update, missing params:", str)
  //   return;
  // }

  // const server = window.apiUrl = server_elm.getAttribute('value');
  // const interval = window.apiInterval = parseInt(interval_elm.getAttribute('value'));
  const server = window.apiUrl = "http://172.20.0.141:8088/api/graph";
  const interval = window.apiInterval = 1000;


  console.log(server, interval);
  if (Graphs.scraper)
  {
    Graphs.stopScraping();
    Graphs.startScraping();
  }
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


    // window.apiUrl = "http://localhost:13370/"
    // window.apiInterval = 200;
    // window.play();
}
