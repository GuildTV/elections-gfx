

function render(){
  Graphs.addRound();

  Graphs.addData(0, 50);
  Graphs.addData(1, 10)
  Graphs.addData(2, 99);
  Graphs.addData(3, 99);
  Graphs.addData(4, 99);
  Graphs.addData(5, 99);
  Graphs.addData(6, 99);
  Graphs.addData(7, 99);
}

// ============================================

var TARGET_BAR_THICKNESS = 55;
var AREA_HEIGHT = 750;

var myLabels = [
  "Aghamirzayev".toUpperCase(),
  "Cherekaeva".toUpperCase(),
  "Guan".toUpperCase(),
  "Liu".toUpperCase(),
  "Mohammed".toUpperCase(),
  "Nwaiwu".toUpperCase(),
  "Nwaiwu".toUpperCase(),
  "RON"
];

var initialData = {
  labels : [ "","","","","","","",""],
  datasets : [
    {
      fillColor : "#333d56",
      highlightFill : "#333d56",
      data : [0,0,0,0,0,0,0,0]
    }
  ]

};

Chart.defaults.global.showScale = false;
Chart.defaults.global.scaleShowLabels = false;
// Chart.defaults.global.scaleOverride = true;
// Chart.defaults.global.scaleSteps = 1.2;
// Chart.defaults.global.scaleStepWidth= 90; // TODO dynamic this
Chart.defaults.global.scaleLineColor = "transparent";
Chart.defaults.global.scaleFontColor = "transparent";
Chart.defaults.global.scaleFontSize = 22;
Chart.defaults.global.maintainAspectRatio = false;

Chart.defaults.global.customTooltips = function(tooltip) {
  if(tooltip == false || !tooltip.text)
    return;

  var elm = document.getElementById('tooltip'+tooltip.y)

  if(!elm){
    elm = document.createElement('span');
    document.getElementById('chartWrapper').appendChild(elm);   
    elm.setAttribute('id', 'tooltip'+tooltip.y); 
  }

  elm.innerHTML = tooltip.text;
  elm.classList.add('myTooltip');

  var chart = Graphs.currentCanvas;

  elm.style.left = (chart.offsetLeft+tooltip.x)+"px";
  elm.style.top = (chart.offsetTop+tooltip.y)+"px";

  // elm.style.marginLeft = -(elm.offsetWidth)+"px";
  elm.style.marginLeft = "10px";
  elm.style.marginTop = -(elm.offsetHeight/2)+"px";

  if(elm.classList.contains('invisible'))
    elm.classList.remove('invisible');
};

var Graphs = {
  columnWidth: 90,

  shuffleExistingCanvas: function(){
    var hidden = document.querySelector('canvas.gone');
    if(hidden){
      hidden.remove();
    }

    // var previous = document.querySelector('canvas.previous');
    // if(previous){
    //   previous.classList.add('gone');
    //   previous.classList.remove('previous');
    // }

    var current = document.querySelector('canvas.current');
    if(current){
      current.classList.add('gone');
      current.classList.remove('current');
    }
  },

  addRound: function(){
    Graphs.removeAllTooltip();
    Graphs.shuffleExistingCanvas();

    var wrapper = document.getElementById('chartWrapper');
    var canvas = Graphs.currentCanvas = document.createElement('canvas');
    wrapper.appendChild(canvas);
    canvas.classList.add('current');
    canvas.height = 550;
    canvas.width = 850;

    var ctx = canvas.getContext('2d');

    var barSpacing = Graphs.barSpacing = (AREA_HEIGHT - (initialData.labels.length * TARGET_BAR_THICKNESS)) / (initialData.labels.length * 2);

    Graphs.current = new Chart(ctx).HorizontalBar(initialData, {
      scaleBeginAtZero: true,
      scaleShowGridLines: true,
      scaleShowVerticalLines: false,
      scaleGridLineColor: "#000",

      barShowStroke: false,
      responsive : true,

      barValueSpacing: barSpacing,

      tooltipFillColor: "transparent",
      tooltipFontColor: "#333",
      tooltipFontSize: 30,
      tooltipTemplate: "<%if (value > 0){%><%=value%><%}%>",

      showTooltips: true,

      onAnimationComplete: function()
      {
        //Show tooltips in bar chart (issue: multiple datasets doesnt work http://jsfiddle.net/5gyfykka/14/)
        this.showTooltip(this.datasets[0].bars, true);
      },
      onAnimationProgress: function()
      {
        var chart = Graphs.currentCanvas;

        for(var i in this.datasets[0].bars){
          var bar = this.datasets[0].bars[i];

          var elm = document.getElementById('tooltip'+bar.x);
          if(elm == null || elm.classList.contains('invisible'))
            continue;

          elm.style.x = (chart.offsetLeft+bar.x)+"px";
        }
      },
    });

    Graphs.createLabels();
  },

  nextRound: function(eliminate){
    Graphs.addRound();

    var oldLabel = document.querySelector('#graphLabel'+eliminate);
    if(oldLabel)
      oldLabel.classList.add('disabled');


  },

  removeAllTooltip: function(){
    var elms = document.querySelectorAll('.myTooltip');

    for(var i in elms){
      if(elms[i].classList)
        elms[i].classList.add('invisible');
      // if(elms[i].remove)
      //   elms[i].remove();
    }
  },

  addData: function(i, v){
    var labelCount = initialData.labels.length;
    Graphs.current.datasets[0].bars[labelCount-1-i].value = v;

    // var currentMax = Graphs.current.scale.stepValue * Graphs.current.scale.steps;
    // var newStepCount = v / Graphs.current.scale.stepValue;

    // if(newStepCount > Graphs.current.scale.steps) {
    //   Graphs.current.scale.steps = newStepCount;
    //   Graphs.current.scale.max = v;
    // }

    Graphs.current.update();
  },

  setQuota: function(v){
    // Graphs.current.scale.stepValue = v;
    // Graphs.current.scale.steps = 1.2;
    // Graphs.current.scale.max = v * 1.2;

    // Graphs.current.update();
  },

  createLabels: function(){
    var wrapper = document.querySelector('#chartLabels');

    var labelCount = initialData.labels.length;

    for(var i = 0; i < labelCount; i++){
      var elm = document.createElement('div');
      elm.classList.add('myLabel')
      elm.setAttribute('id', 'graphLabel'+i);
      elm.innerHTML = myLabels[i];
      elm.style.marginTop = (Graphs.barSpacing*2)+"px";
      wrapper.appendChild(elm);
    }

    // var table = document.createElement('table');
    // document.querySelector('.chartFooter').appendChild(table);
    // var tr1 = document.createElement('div');
    // tr1.classList.add('myRow');
    // document.querySelector('.chartFooter').appendChild(tr1);
    // var tr2 = document.createElement('div');
    // tr2.classList.add('myRow');
    // document.querySelector('.chartFooter').appendChild(tr2);

    // var labelCount = initialData.labels.length;

    // var fullWidth = 2 * (Graphs.columnWidth + Graphs.columnSeperation);
    // var leftMargin = (Graphs.columnWidth + Graphs.columnSeperation) / 2;
    // var spacerWidth = (Graphs.columnWidth + Graphs.columnSeperation);

    // document.querySelector('.chartFooter').style.marginLeft = -(leftMargin-75)+"px";
    // var rowWidth = 900 + leftMargin * 2;
    // tr1.style.width = rowWidth+"px";
    // tr2.style.width = rowWidth+"px";

    // for(var i = 0; i <= labelCount; i++){
    //   if(i == 0){
    //     Graphs.addLabel(tr1, fullWidth, myLabels[i]);
    //     Graphs.addLabel(tr2, spacerWidth, "");
    //   } else if (i == labelCount){
    //     var tr = i%2 == 0 ? tr1 : tr2;
    //     Graphs.addLabel(tr, spacerWidth, "");
    //   } else {
    //     var tr = i%2 == 0 ? tr1 : tr2;
    //     Graphs.addLabel(tr, fullWidth, myLabels[i]);
    //   }  
    // }
  },

  addLabel: function(tr, width, val){
    var td = document.createElement('div');
    td.classList.add('myLabel')
    td.style.width = width+"px";
    td.innerHTML = val; 
    tr.appendChild(td);
  }
};