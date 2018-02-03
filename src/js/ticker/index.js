require("sass/ticker/app.scss");

import { TimelineMax } from "gsap";

const scrollRate = 100; // px per second
const seperation = 0; // px

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
let isFirstData = true;

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

function createItem(str, cl){
  const e = document.createElement("span");
  e.innerText = str;

  if (cl)
    e.classList.add(cl);

  return e;
}
window.addNext = function() {
  const elm = document.createElement("div");
  elm.classList.add("content", "next");

  for (let str of nextData){
    elm.append(createItem(str));
    elm.append(createItem("I", "spacer"));
  }

  document.querySelector('.ticker-bar').append(elm);
}

window.run = function() {
  window.addNext();
  const elm = document.querySelector(".content.next");
  elm.classList.remove("next");
  const width = Math.max(400, elm.scrollWidth) + (isFirstData ? 33 : 0);
  isFirstData = false;
  elm.style.width = width + "px";

  const prev = document.querySelectorAll(".content");
  if (prev.length > 1){
    const p = prev[prev.length-2];
    const newLeft = p.scrollWidth + parseInt(p.style.left);
    elm.style.left = newLeft + "px";
  }

  const tl = new TimelineMax();

  const movement = elm.offsetLeft + width;
  const runtime = movement / scrollRate;
  const nextTime = (width + seperation) / scrollRate;
  tl.to(elm, runtime, {left: -width+"px", ease:Linear.easeNone})
    .addCallback(() => {
      elm.remove();
    }, runtime, [ elm ])
    .addCallback(() => {
      // run next one!
      if (!runningPurge && tl.isActive())
        window.run();
    }, nextTime, [ elm ]);
    activeTimelines.push(tl);
}

window.purge = function() {
  runningPurge = true;

  const elm = document.querySelector(".ticker-bar");
  const tl = new TimelineMax();

  tl.to(elm, 0.3, {opacity: 0, ease:Linear.easeNone})
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
