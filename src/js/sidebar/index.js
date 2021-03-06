require("sass/sidebar/app.scss");

import nullImg from '../ronImg';

window.play = function(){
  const dataWrapper = document.querySelector('.sidebar');
  dataWrapper.classList.add('visible');
};

window.update = function(str){
  let data = window.data = JSON.parse(str);
  if (data.sidebar_data)
    data = JSON.parse(data.sidebar_data);

  const holder = document.querySelector('.sidebar');

  // Note, sidebar-name-test.html can be used to check this split for all roles
  let text_role = data.Position.fullName;
  const text_split_pos = text_role.toLowerCase().indexOf("officer");
  if (text_split_pos == text_role.indexOf(" ") + 1) // one split which is before officer
    text_role = text_role.substring(0, text_split_pos) + "\n" + text_role.substring(text_split_pos);
  if (text_role.indexOf(" ") == -1)
    text_role = "\n" + text_role;
  holder.querySelector('.heading #role').innerHTML = text_role;
  // holder.querySelector('.heading #role').innerHTML = "";
  //holder.querySelector('.heading #type').innerHTML = data.elected?"elect":"candidate";

  if(data.photo){
    holder.classList.add('photo');
    holder.querySelector('.image img').src = data.photo;
    // holder.querySelector('.image img').src = "/img/template/candidate-sample.png";
    holder.querySelector('.image #name').innerHTML = data.firstName + " " + data.lastName;
  } else {
    holder.classList.remove('photo');
  }

  holder.querySelector('.name h2').innerHTML = data.firstName + " " + data.lastName;

  let img_role = data.Position.compactName + (data.elected?" Elect":" Candidate");
  // Note, sidebar-name-test.html can be used to check this split for all roles
  const img_split_pos = img_role.toLowerCase().indexOf("officer");
  if (img_split_pos >= 16)
    img_role = img_role.substring(0, img_split_pos) + "\n" + img_role.substring(img_split_pos);
  holder.querySelector('.img_role h2').innerHTML = img_role;

  holder.querySelector('.manifesto .line1 h3').innerHTML = data.manifestoOne;
  holder.querySelector('.manifesto .line2 h3').innerHTML = data.manifestoTwo;
  holder.querySelector('.manifesto .line3 h3').innerHTML = data.manifestoThree;
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
    window.update('{"id":23,"uid":"pres-kris-burnett","positionId":1,"firstName":"MrLongName","lastName":"HasALongSurname","photo":null,"manifestoOne":"Safer Selly Scheme","manifestoTwo":"Cheaper food and drink (Happy hour)","manifestoThree":"High speed reliable WiFi","order":1,"elected":false,"createdAt":"2017-02-28T21:33:19.000Z","updatedAt":"2017-03-03T21:21:12.000Z","PositionId":1,"Position":{"id":1,"type":"candidateSabb","fullName":"President","compactName":"President","miniName":"President","order":10,"winnerOrder":10,"sidebarUseOfficer":false,"createdAt":"2017-02-11T13:44:09.000Z","updatedAt":"2017-03-03T15:53:04.000Z"}}');
    setTimeout(window.play, 50);
  };


// setTimeout(window.fakePhoto, 50);
setTimeout(window.fakeText, 50);
}