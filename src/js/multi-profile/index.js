require("sass/multi-profile/app.scss");

import { TimelineLite } from "gsap";

import nullImg from '../ronImg';

window.update = function(str){
  const data = window.data = JSON.parse(str);

  const winners = false; // !data.position;

  let people = data.candidates;
  if(people.length == 1 && people[0][0] !== undefined)
    people = people[0];

  document.querySelector('h1.title').innerText = (winners ? "" : data.position.fullName).toUpperCase();

  const peopleDiv = document.querySelector('.people');
  for (let c of peopleDiv.classList) {
    if (c.indexOf("count") == 0)
      peopleDiv.classList.remove(c);
  }

  peopleDiv.classList.add('count'+people.length);
  
  if(winners)
    peopleDiv.classList.add('winners');

  const profiles = peopleDiv.querySelectorAll('.multiProfile');
  for(let i = 0; i < profiles.length; i++){
    const node = profiles[i];
    const person = people[i];

    if(person === undefined){
      node.style.display = "none";
      // peopleDiv.removeChild(node);
      continue;
    }
    node.style.display = null;

    node.querySelector('img').setAttribute('src', person.photo || nullImg);

    if(winners){
      node.querySelector('h1').innerHTML = (person.firstName.toUpperCase() + "<br />" + person.lastName.toUpperCase()).trim();
      node.querySelector('h2').innerText = person.Position.miniName.toUpperCase();
    } else {
      node.querySelector('h1').innerText = person.firstName.toUpperCase();
      node.querySelector('h2').innerText = person.lastName.toUpperCase();
    }
  }
};

window.play = function(){
  animate();
};

window.stop = function(){
  document.body.style.visibility = "hidden";
};

function letterSpacing(){
  
  const profiles = document.querySelectorAll('.multiProfile');
  for(let i = 0; i < profiles.length; i++){
    const node = profiles[i];
  
    const h1 = node.querySelector('h1');
    const h2 = node.querySelector('h2');

    h1.style.letterSpacing = "";
    h2.style.letterSpacing = "";
    h2.style.transform = "";
  
    const space1 = (h1.clientWidth-h1.scrollWidth)/(h1.textContent.length-1);
    const space2 = (h2.clientWidth-h2.scrollWidth)/(h2.textContent.length-1);

    if(space1 < 0)
      h1.style.letterSpacing = space1+"px";
    if(space2 < 0){
      if (space2 < -3.5)
        h2.style.letterSpacing = "-3.5px";
      else
        h2.style.letterSpacing = space2+"px";

      if (space2 < -3.5){
        h2.style.transform = "scaleX(" + (h2.clientWidth/h2.scrollWidth) + ")";
      }
    }
  
  }
}

function animate(){
  const tl = new TimelineLite();

  letterSpacing();
  // setTimeout(letterSpacing, 50);

  document.querySelector('.main').style.visibility = "visible";

  const elm = document.querySelectorAll('.multiProfile div.name');

  tl.to(elm, 0.6, {top: "0px"})
    .to(elm, 0.2, {autoAlpha: 1}, '-=0.6');
}

if (window.location.hash.indexOf("dev") != -1){
  console.log("DEV MODE");

  document.body.classList.add("dev");

  window.devClean = function(){
    document.querySelector('.main').style.visibility = "hidden";

    const elms = document.querySelectorAll('.multiProfile div.name');
    for (let e of elms){
      e.style.top = null;
      e.style.opacity = null;
    }
  };

  window.devRole = function(){
    const candidates = [
      {"id":27,"uid":"ado-adam-elmi","positionId":8,"firstName":"Piangfan","lastName":"Naksukpaiboon","photo":null,"manifestoOne":"Non-traditional jobs career fair","manifestoTwo":"Expand Hands Up funding","manifestoThree":"How to run your society workshop","order":1,"elected":false,"createdAt":"2017-02-28T21:51:20.000Z","updatedAt":"2017-03-03T21:05:19.000Z","PositionId":8},
      {"id":28,"uid":"ado-shannon-farmer","positionId":8,"firstName":"Namrata Ramchandra","lastName":"Bhoir","photo":null,"manifestoOne":"Room booking via Guild App","manifestoTwo":"Improve Guild's media center","manifestoThree":"Guild promotion as priority","order":2,"elected":false,"createdAt":"2017-02-28T21:52:38.000Z","updatedAt":"2017-02-28T21:52:38.000Z","PositionId":8},
      {"id":30,"uid":"ado-alina-morosan","positionId":8,"firstName":"Lucinda","lastName":"Bleichroeder-Baker","photo":null,"manifestoOne":"Widen collaboration with other students unions","manifestoTwo":"Encouraging students to get involved with societies","manifestoThree":"Access new sources of funding","order":4,"elected":false,"createdAt":"2017-02-28T21:55:40.000Z","updatedAt":"2017-03-03T21:05:38.000Z","PositionId":8},
      {"id":31,"uid":"ado-george-thomas","positionId":8,"firstName":"George","lastName":"Thomas","photo":null,"manifestoOne":"Improve society inclusivity","manifestoTwo":"Improve room allocation and society storage","manifestoThree":"Promote and introduce events to cater to all members of the university","order":5,"elected":false,"createdAt":"2017-02-28T22:01:50.000Z","updatedAt":"2017-02-28T22:01:50.000Z","PositionId":8},
      {"id":32,"uid":"ado-maddy-tysoe","positionId":8,"firstName":"Maddy","lastName":"Tysoe","photo":null,"manifestoOne":"Maximise society potential","manifestoTwo":"Assisting events management","manifestoThree":"Developing media collaboration","order":6,"elected":false,"createdAt":"2017-02-28T22:03:35.000Z","updatedAt":"2017-03-03T15:30:33.000Z","PositionId":8},
      {"id":27,"uid":"ado-adam-elmi","positionId":8,"firstName":"Adam","lastName":"Elmi","photo":null,"manifestoOne":"Non-traditional jobs career fair","manifestoTwo":"Expand Hands Up funding","manifestoThree":"How to run your society workshop","order":1,"elected":false,"createdAt":"2017-02-28T21:51:20.000Z","updatedAt":"2017-03-03T21:05:19.000Z","PositionId":8},
      {"id":28,"uid":"ado-shannon-farmer","positionId":8,"firstName":"Shannon","lastName":"Farmer","photo":null,"manifestoOne":"Room booking via Guild App","manifestoTwo":"Improve Guild's media center","manifestoThree":"Guild promotion as priority","order":2,"elected":false,"createdAt":"2017-02-28T21:52:38.000Z","updatedAt":"2017-02-28T21:52:38.000Z","PositionId":8},
      {"id":30,"uid":"ado-alina-morosan","positionId":8,"firstName":"Alina","lastName":"Morosan","photo":null,"manifestoOne":"Widen collaboration with other students unions","manifestoTwo":"Encouraging students to get involved with societies","manifestoThree":"Access new sources of funding","order":4,"elected":false,"createdAt":"2017-02-28T21:55:40.000Z","updatedAt":"2017-03-03T21:05:38.000Z","PositionId":8},
      {"id":31,"uid":"ado-george-thomas","positionId":8,"firstName":"George","lastName":"Thomas","photo":null,"manifestoOne":"Improve society inclusivity","manifestoTwo":"Improve room allocation and society storage","manifestoThree":"Promote and introduce events to cater to all members of the university","order":5,"elected":false,"createdAt":"2017-02-28T22:01:50.000Z","updatedAt":"2017-02-28T22:01:50.000Z","PositionId":8},
      {"id":32,"uid":"ado-maddy-tysoe","positionId":8,"firstName":"Maddy","lastName":"Tysoe","photo":null,"manifestoOne":"Maximise society potential","manifestoTwo":"Assisting events management","manifestoThree":"Developing media collaboration","order":6,"elected":false,"createdAt":"2017-02-28T22:03:35.000Z","updatedAt":"2017-03-03T15:30:33.000Z","PositionId":8},
    ];

    const count = parseInt(document.querySelector("#devCount").value);
    console.log(count, candidates.length);
    const toShow = candidates.slice(0, count);

    window.update(JSON.stringify({"candidates":toShow,"position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}}));
    setTimeout(animate, 50);
  };

  // window.devWinner = function(){
  //   const candidates = [
  //     {"id":27,"uid":"ado-adam-elmi","positionId":8,"firstName":"Adam","lastName":"Elmi","photo":null,"manifestoOne":"Non-traditional jobs career fair","manifestoTwo":"Expand Hands Up funding","manifestoThree":"How to run your society workshop","order":1,"elected":false,"createdAt":"2017-02-28T21:51:20.000Z","updatedAt":"2017-03-03T21:05:19.000Z","PositionId":8,"Position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}},
  //     {"id":28,"uid":"ado-shannon-farmer","positionId":8,"firstName":"Shannon","lastName":"Farmer","photo":null,"manifestoOne":"Room booking via Guild App","manifestoTwo":"Improve Guild's media center","manifestoThree":"Guild promotion as priority","order":2,"elected":false,"createdAt":"2017-02-28T21:52:38.000Z","updatedAt":"2017-02-28T21:52:38.000Z","PositionId":8,"Position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}},
  //     {"id":30,"uid":"ado-alina-morosan","positionId":8,"firstName":"Alina","lastName":"Morosan","photo":null,"manifestoOne":"Widen collaboration with other students unions","manifestoTwo":"Encouraging students to get involved with societies","manifestoThree":"Access new sources of funding","order":4,"elected":false,"createdAt":"2017-02-28T21:55:40.000Z","updatedAt":"2017-03-03T21:05:38.000Z","PositionId":8,"Position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}},
  //     {"id":31,"uid":"ado-george-thomas","positionId":8,"firstName":"George","lastName":"Thomas","photo":null,"manifestoOne":"Improve society inclusivity","manifestoTwo":"Improve room allocation and society storage","manifestoThree":"Promote and introduce events to cater to all members of the university","order":5,"elected":false,"createdAt":"2017-02-28T22:01:50.000Z","updatedAt":"2017-02-28T22:01:50.000Z","PositionId":8,"Position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}},
  //     {"id":32,"uid":"ado-maddy-tysoe","positionId":8,"firstName":"Maddy","lastName":"Tysoe","photo":null,"manifestoOne":"Maximise society potential","manifestoTwo":"Assisting events management","manifestoThree":"Developing media collaboration","order":6,"elected":false,"createdAt":"2017-02-28T22:03:35.000Z","updatedAt":"2017-03-03T15:30:33.000Z","PositionId":8,"Position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}},
  //     {"id":27,"uid":"ado-adam-elmi","positionId":8,"firstName":"Adam","lastName":"Elmi","photo":null,"manifestoOne":"Non-traditional jobs career fair","manifestoTwo":"Expand Hands Up funding","manifestoThree":"How to run your society workshop","order":1,"elected":false,"createdAt":"2017-02-28T21:51:20.000Z","updatedAt":"2017-03-03T21:05:19.000Z","PositionId":8,"Position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}},
  //     {"id":28,"uid":"ado-shannon-farmer","positionId":8,"firstName":"Shannon","lastName":"Farmer","photo":null,"manifestoOne":"Room booking via Guild App","manifestoTwo":"Improve Guild's media center","manifestoThree":"Guild promotion as priority","order":2,"elected":false,"createdAt":"2017-02-28T21:52:38.000Z","updatedAt":"2017-02-28T21:52:38.000Z","PositionId":8,"Position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}},
  //     {"id":30,"uid":"ado-alina-morosan","positionId":8,"firstName":"Alina","lastName":"Morosan","photo":null,"manifestoOne":"Widen collaboration with other students unions","manifestoTwo":"Encouraging students to get involved with societies","manifestoThree":"Access new sources of funding","order":4,"elected":false,"createdAt":"2017-02-28T21:55:40.000Z","updatedAt":"2017-03-03T21:05:38.000Z","PositionId":8,"Position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}},
  //     {"id":31,"uid":"ado-george-thomas","positionId":8,"firstName":"George","lastName":"Thomas","photo":null,"manifestoOne":"Improve society inclusivity","manifestoTwo":"Improve room allocation and society storage","manifestoThree":"Promote and introduce events to cater to all members of the university","order":5,"elected":false,"createdAt":"2017-02-28T22:01:50.000Z","updatedAt":"2017-02-28T22:01:50.000Z","PositionId":8,"Position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}},
  //     {"id":32,"uid":"ado-maddy-tysoe","positionId":8,"firstName":"Maddy","lastName":"Tysoe","photo":null,"manifestoOne":"Maximise society potential","manifestoTwo":"Assisting events management","manifestoThree":"Developing media collaboration","order":6,"elected":false,"createdAt":"2017-02-28T22:03:35.000Z","updatedAt":"2017-03-03T15:30:33.000Z","PositionId":8,"Position":{"id":8,"type":"candidateSabb","fullName":"Activities and Development Officer","compactName":"Activities & Development","miniName":"ADO","order":2,"winnerOrder":2,"sidebarUseOfficer":true,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-02-11T13:44:09.000Z"}},
  //   ];

  //   const count = parseInt(document.querySelector("#devCount").value);
  //   console.log(count, candidates.length);
  //   const toShow = candidates.slice(0, count);

  //   window.update(JSON.stringify({"candidates":toShow}));
  //   setTimeout(animate, 50);
  // };

  setTimeout(window.devRole, 50);

}