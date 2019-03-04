require("sass/ticker/app.scss");

import { TimelineMax } from "gsap";

const fadeTime = 0.5;
const screenTime = 6;

let pollUrl = null;
let pollInterval = 1000;

let isRunning = false;
let activeTimelines = [];
let runningPurge = false;
let nextData = [
  // "Some idiot got banned from campaigning for innaccurate campaign slogans",
  // "We talk to the leading expert in why students just don't give a fuck",
  // "Coming up: Answers to your biggest Guild Elections questions",
  // "We find out what we can get away with saying on here",
];

window.update = function(str) {
  const data = JSON.parse(str);

  pollUrl = data.url;
  pollInterval = data.interval;
}

function scrape(){
  return fetch(pollUrl, {cache: "no-store"})
  .then(res => res.json())
  .then(res => {
    nextData = res.data || [];

    if (res.purge)
      purge();
  })
  .catch(() => {
    console.log("Poll failed!")
  }).then(() => {
    console.log(pollInterval || 1000)
    window.setTimeout(scrape, pollInterval)
  });
}

window.play = function() { // animate in
  if (isRunning)
    return;

  isRunning = true;
  scrape().then(() => window.run());
}

window.stop = function () {
  window.run = function(){};
  purge();
}

window.addNext = function() {
  const elm = document.querySelector('.ticker-bar');
  
  for (let str of nextData){
    const e = document.createElement("div");
    e.classList.add("content", "next");
    e.innerHTML = str;
    elm.append(e);
  }
}

window.run = function() {
  const elms = document.querySelectorAll(".content.next");
  if (elms.length == 0)
    window.addNext();

  const cur = document.querySelector(".content.current");
  const elm = document.querySelector(".content.next");
  if (!elm)
    return setTimeout(window.run, pollInterval);

  elm.classList.remove("next");
  elm.classList.add("current");

  const tl = new TimelineMax();
  if (cur)
    tl.to(cur, fadeTime, {opacity: 0, ease:Linear.easeNone});
  tl.to(elm, fadeTime, {opacity: 1, ease:Linear.easeNone})
    .addCallback(() => {
      if (cur) cur.remove()
    }, fadeTime, [ elm ])
    .addCallback(() => {
      window.run();
    }, screenTime, [ elm ])
    activeTimelines.push(tl);
}

window.purge = function() {
  runningPurge = true;

  const elm = document.querySelector(".ticker-bar");
  const tl = new TimelineMax();

  tl.to(elm, fadeTime, {opacity: 0, ease:Linear.easeNone})
    .addCallback(() => {
      // Stop all active
      for(let t of activeTimelines)
        t.kill();
      activeTimelines = [];

      // remove all children
      elm.innerHTML = "";
      elm.style.opacity = 1;

      runningPurge = false;

      // Now go around again
      window.run();
    });
}

if (window.location.hash.indexOf("dev") != -1){
  console.log("DEV MODE");

  document.body.classList.add("dev");

  window.devPause = function(){
      for(let t of activeTimelines)
        t.pause();
  }

  window.devSet = function() {
    pollUrl = document.querySelector('#devUrl').value;
    pollInterval = document.querySelector('#devInterval').value;
  }

  window.devRun = function (){
    window.devSet();

    window.play();
  }

  setTimeout(window.devRun, 150);
}

  window.devPause = function(){
      for(let t of activeTimelines)
        t.pause();
  }