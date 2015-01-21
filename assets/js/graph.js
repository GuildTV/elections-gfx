//charts and data being used
var data = [];
var chart = [];
var halfLoaded = false;
var doneInit = false;

//data population
function addNext() {
  var votes = randomScalingFactor();
  data[activeChart].setValue(upNext, 1,votes );
  data[activeChart].setValue(upNext, 2, votes+"");
  upNext = ++upNext%4;

  drawCharts();
}
var upNext = 0;
var activeChart = 0;

var randomScalingFactor = function(){ return Math.round(Math.random()*1000);};

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(init);

//all graph options
var options = {
  annotations: {
    textStyle: {
      // fontName: 'Times-Roman',
      fontSize: 50,
      // bold: true,
      // italic: true,
      color: '#871b47',     // The color of the text.
      auraColor: '#d799ae', // The color of the text outline.
      opacity: 0.8          // The transparency of the text.
    }
  },

  animation:{
    duration: 800,
    easing: 'out',
  },
  legend: {position: 'none'},
  vAxis: { 
    minValue: 0, 
    maxValue: 1,
    textPosition: 'none',
    gridlines: {
      color: 'transparent'
    }
  },
  hAxis: {
    textStyle: {
      fontSize: 50,
      opacity: 0.8          // The transparency of the text.
    }
  },
  backgroundColor: { fill:'transparent' },
  bar: {
    groupWidth: 200
  }
};

function setupGraph(num){
  var data = window.data[num] = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('number', 'Value');
  data.addColumn({type: 'string', role: 'annotation'});

  $(window.templateData).find('#f1 #text').attr('value').split(',').forEach(function(v,i){
    data.addRow([v, 0, ""]);
  });

  var chart = window.chart[num] = new google.visualization.ColumnChart(
      document.getElementById('chart_div'+num));
}

function drawCharts() {
  $.each(window.chart, function(i,v){
    v.draw(window.data[i], options);
  });
}

function showChart(num){
  $(".chart.background:not(.deleted)").removeClass('background').addClass('deleted');
  $(".chart:not(.background):not(.deleted):not(.hidden)").addClass('background');

  if($('#chart_div'+num).length === 0)
    $('#chart_holder').append($('<div></div>').addClass('chart hidden').attr('id', 'chart_div'+num));

  setupGraph(num);
  activeChart = num;

  drawCharts();
  $("#chart_div"+num).removeClass('hidden');
}

function init() {
  if(halfLoaded && !doneInit){
    // $('body').addClass('small');

    showChart(0);
    doneInit = true;
  }
  halfLoaded = true;
}



/* 
 * CASPAR-CG COMMANDS
*/

// CALL 1-1 PLAY
function play() {
  // document.getElementById("demo").innerHTML="play2";
  init();
}
// CALL 1-1 STOP
function stop() {
  document.getElementById("demo").innerHTML="stop";
}
// CALL 1-1 NEXT
function next() {
  addNext();
  document.getElementById("demo").innerHTML="next";
}
// CALL 1-1 REMOVE
function remove() {
  document.getElementById("demo").innerHTML="remove";
}
// CALL 1-1 UPDATE STRING
function update(str) {
  document.getElementById("demo").innerHTML="update: " + str.length;
  window.templateData = (new DOMParser()).parseFromString(str,"text/xml");
  init();
}
// CALL 1-1 INVOKE STRING
function invoke(str) {
  eval(str);
}
// CALL 1-1 INVOKE "otherFunction('testing');"
function otherFunction(str) {
  document.getElementById("demo").innerHTML="Other function called with: " + str;
}

//temporary to fake data (for testing in browser)
function fake(){
  update("<templateData><componentData id=\"f1\"><data id=\"text\" value=\"Niklas P Andersson,Rob Sumner\" /></componentData></templateData>");
}
