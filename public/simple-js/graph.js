

function render(){
  Graphs.addRound();

  // Graphs.addData(0, 50);
  // Graphs.addData(1, 10)
  // Graphs.addData(2, 99);
  // Graphs.addData(3, 99);
  // Graphs.addData(4, 99);
  // Graphs.addData(5, 99);
  // Graphs.addData(6, 99);
  // Graphs.addData(7, 99);
}

// ============================================

var TARGET_BAR_THICKNESS = 55;
var TARGET_BAR_SPACING = 20*2;
var MAX_AREA_HEIGHT = 750;

Chart.defaults.global.showScale = false;
Chart.defaults.global.scaleShowLabels = false;
Chart.defaults.global.scaleLineColor = "transparent";
Chart.defaults.global.scaleFontColor = "transparent";
Chart.defaults.global.scaleFontSize = 22;
Chart.defaults.global.maintainAspectRatio = false;

Chart.defaults.global.customTooltips = function(tooltip) {
  if(tooltip == false || !tooltip.text)
    return;

  var elm = document.getElementById('tooltip'+Math.floor(tooltip.y))

  if(!elm){
    elm = document.createElement('span');
    document.getElementById('chartWrapper').appendChild(elm);   
    elm.setAttribute('id', 'tooltip'+Math.floor(tooltip.y)) 
  }

  elm.innerHTML = tooltip.text;
  elm.classList.add('myTooltip');

  var chart = Graphs.currentCanvas;

  elm.style.left = (chart.offsetLeft+tooltip.x)+"px";
  elm.style.top = (chart.offsetTop+tooltip.y)+"px";

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

    var barSpacing = Graphs.barSpacing = TARGET_BAR_SPACING/2;

    var chartHeight = (TARGET_BAR_SPACING + TARGET_BAR_THICKNESS) * Graphs.myLabels.length;
    var marginTop = (MAX_AREA_HEIGHT - chartHeight)/2;
    wrapper.style.height = chartHeight+"px";
    canvas.style.marginTop = marginTop + "px";
    document.querySelector('#chartLabels').style.marginTop = (marginTop+45) + "px";


    var labels = [];
    for(var i in Graphs.myLabels){
      labels.push("");
    }
    var initialData = {
      labels : labels,
      datasets : [
        {
          fillColor : "#333d56",
          highlightFill : "#333d56",
          data : [0,0,0,0,0,0,0,0,0,0,0]
        }
      ]
    };

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

          var elm = document.getElementById('tooltip'+Math.floor(bar.y+1));
          if(elm == null || elm.classList.contains('invisible'))
            continue;

          elm.style.left = (chart.offsetLeft+bar.x)+"px";
        }
      },
    });

    Graphs.createLabels();
  },

  nextRound: function(eliminate){
    Graphs.addRound();

    Graphs.setEliminated(eliminate);
  },

  setEliminated: function(id){
    var oldLabel = document.querySelector('#graphLabel'+id);
    if(oldLabel)
      oldLabel.classList.add('disabled');
  },

  removeAllTooltip: function(){
    var elms = document.querySelectorAll('.myTooltip');

    for(var i in elms){
      if(elms[i].classList)
        elms[i].classList.add('invisible');
    }
  },

  addData: function(i, v){
    if(v == undefined || v == null)
      return;

    var labelCount = Graphs.myLabels.length;
    Graphs.current.datasets[0].bars[labelCount-1-i].value = v;

    Graphs.current.update();
  },

  createLabels: function(){
    var wrapper = document.querySelector('#chartLabels');

    if(wrapper.innerHTML.length > 10)
      return;

    var labelCount = Graphs.myLabels.length;

    for(var i = 0; i < labelCount; i++){
      var elm = document.createElement('div');
      elm.classList.add('myLabel')
      elm.setAttribute('id', 'graphLabel'+i);
      elm.innerHTML = Graphs.myLabels[i];
      elm.style.marginTop = (Graphs.barSpacing*2)+"px";
      wrapper.appendChild(elm);
    }
  },

  setTitle: function(title){
    document.querySelector('#graphRoleTitle').innerHTML = title;
  },

  initialLoad: function(data){
    console.log("LOAD", data);

    Graphs.setTitle(data.position.fullName);
    Graphs.myLabels = data.labels;
    Graphs.addRound();
    Graphs.createLabels();

    // set eliminated candidates
    for(var i in data.eliminated){
      Graphs.setEliminated(data.eliminated[i]);
    }

    // add starting round of votes
    var votes = data.votes[data.eliminated.length];
    if(!votes || votes.length == 0)
      return;

    for(var i in votes){
      Graphs.addData(i, votes[i]);
    }
  },

  socketEliminate: function(data){
    console.log("ELIMINATE", data);

    Graphs.nextRound(data.index);
  },

  socketVote: function(data){
    console.log("VOTE", data);

    Graphs.addData(data.index, data.count);
  }
};