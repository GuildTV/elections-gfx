require("sass/graph/app.scss");

import Graphs from './graph.js';

window.stop = function(){
	document.querySelector('body').style.display = "none";
}

window.play = function(str){
	// TODO - start scraper
	Graphs.startScraping();
}

window.update = function(str){
	var xml = (new DOMParser()).parseFromString(str, "text/xml");
	var server = window.apiUrl = xml.querySelector('#server #text').getAttribute('value');
	var interval = window.apiInterval = parseInt(xml.querySelector('#interval #text').getAttribute('value'));

	console.log(server, interval);
}

// update("<templateData><componentData id=\"server\"><data id=\"text\" value=\"http://localhost:8088/graph\" /></componentData><componentData id=\"interval\"><data id=\"text\" value=\"1000\" /></componentData></templateData>");
// play();

// Graphs.scrapeData();



if (window.location.hash.indexOf("dev") != -1){
	console.log("DEV MODE");

	document.body.classList.add("dev");

}