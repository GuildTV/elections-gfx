require("sass/sidebar/app.scss");

import nullImg from '../ronImg';

window.play = function(){
  const dataWrapper = document.querySelector('.sidebar');
  dataWrapper.classList.add('visible');
};

window.update = function(str){
  const data = window.data = JSON.parse(str);
  const holder = document.querySelector('.sidebar');

  holder.querySelector('.heading #role').innerText = data.Position.compactName;
  holder.querySelector('.heading #type').innerText = data.elected?"elect":"candidate";

  if(data.photo){
    holder.classList.add('photo');
    holder.querySelector('.image img').src = data.photo;
    // holder.querySelector('.image img').src = "/img/template/candidate-sample.png";
    holder.querySelector('.image #name').innerText = data.firstName + " " + data.lastName;
  } else {
    holder.classList.remove('photo');
  }

  holder.querySelector('.name h2').innerText = data.firstName + " " + data.lastName;
  holder.querySelector('.img_role h2').innerText = data.Position.compactName + (data.elected?" Elect":" Candidate");

  holder.querySelector('.manifesto .line1 h3').innerText = data.manifestoOne;
  holder.querySelector('.manifesto .line2 h3').innerText = data.manifestoTwo;
  holder.querySelector('.manifesto .line3 h3').innerText = data.manifestoThree;
};

window.stop = function(){
  document.querySelector('body').innerHTML = "";
};

window.remove = function() {
  document.querySelector('body').innerHTML = "";
};

if (window.location.hash.indexOf("dev") != -1){
  console.log("DEV MODE");

  document.body.classList.add("dev");

  window.devClean = function(){
    document.body.classList.remove("dev-photo", "dev-text");

    const dataWrapper = document.querySelector('.sidebar');
    dataWrapper.classList.remove('visible');
  };

  window.fakePhoto = function(){
    document.body.classList.remove("dev-photo", "dev-text");
    document.body.classList.add("dev-photo");

    window.update('{"id":23,"uid":"pres-kris-burnett","positionId":1,"firstName":"MrLongName","lastName":"HasALongSurname","photo":"'+nullImg+'","manifestoOne":"Safer Selly Scheme","manifestoTwo":"Cheaper food and drink (Happy hour)","manifestoThree":"High speed reliable WiFi","order":1,"elected":false,"createdAt":"2017-02-28T21:33:19.000Z","updatedAt":"2017-03-03T21:21:12.000Z","PositionId":1,"Position":{"id":1,"type":"candidateSabb","fullName":"President","compactName":"Activities and Employability Officer","miniName":"President","order":10,"winnerOrder":10,"sidebarUseOfficer":false,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-03-03T15:53:04.000Z"}}');
    setTimeout(window.play, 50);
  };
  window.fakeText = function(){
    document.body.classList.remove("dev-photo", "dev-text");
    document.body.classList.add("dev-text");

    // window.update('{"id":23,"uid":"pres-kris-burnett","positionId":1,"firstName":"Kris","lastName":"Burnett","photo":null,"manifestoOne":"Safer Selly Scheme","manifestoTwo":"Cheaper food and drink (Happy hour)","manifestoThree":"High speed reliable WiFi","order":1,"elected":false,"createdAt":"2017-02-28T21:33:19.000Z","updatedAt":"2017-03-03T21:21:12.000Z","PositionId":1,"Position":{"id":1,"type":"candidateSabb","fullName":"President","compactName":"Presidential","miniName":"President","order":10,"winnerOrder":10,"sidebarUseOfficer":false,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-03-03T15:53:04.000Z"}}');
    window.update('{"id":23,"uid":"pres-kris-burnett","positionId":1,"firstName":"MrLongName","lastName":"HasALongSurname","photo":null,"manifestoOne":"Safer Selly Scheme","manifestoTwo":"Cheaper food and drink (Happy hour)","manifestoThree":"High speed reliable WiFi","order":1,"elected":false,"createdAt":"2017-02-28T21:33:19.000Z","updatedAt":"2017-03-03T21:21:12.000Z","PositionId":1,"Position":{"id":1,"type":"candidateSabb","fullName":"President","compactName":"Activities and Employability Officer","miniName":"President","order":10,"winnerOrder":10,"sidebarUseOfficer":false,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-03-03T15:53:04.000Z"}}');
    setTimeout(window.play, 50);
  };


// setTimeout(window.fakePhoto, 50);
}