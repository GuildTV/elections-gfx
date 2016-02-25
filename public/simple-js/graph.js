

function render(){
  Graphs.addRound();

  Graphs.addData(0, 50);
  Graphs.addData(1, 10)
  Graphs.addData(3, 99);
}

// ============================================

var initialData = {
  labels : [
    "Aghamirzayev".toUpperCase(),
    "Cherekaeva".toUpperCase(),
    "Guan".toUpperCase(),
    "Liu".toUpperCase(),
    "Mohammed".toUpperCase(),
    "Nwaiwu".toUpperCase(),
    "RON"
  ],
  datasets : [
    {
      fillColor : "#333d56",
      highlightFill : "#333d56",
      data : [0,0,0,0,0,0,0,0]
    }
  ]

};

Chart.defaults.global.scaleShowLabels = false;
Chart.defaults.global.scaleLineColor = "transparent";
Chart.defaults.global.scaleFontColor = "#333";
Chart.defaults.global.scaleFontSize = 22;

Chart.defaults.global.customTooltips = function(tooltip) {
  if(tooltip == false || !tooltip.text)
    return;

  var elm = document.getElementById('tooltip'+tooltip.x)

  if(!elm){
    elm = document.createElement('span');
    document.getElementById('chartWrapper').appendChild(elm);   
    elm.setAttribute('id', 'tooltip'+tooltip.x); 
  }

  elm.innerHTML = tooltip.text;
  elm.classList.add('myTooltip');

  var chart = Graphs.currentCanvas;

  elm.style.left = (chart.offsetLeft+tooltip.x)+"px";
  elm.style.top = (chart.offsetTop+tooltip.y)+"px";

  elm.style.marginLeft = -(elm.offsetWidth/2)+"px";
  elm.style.marginTop = -(elm.offsetHeight)+"px";

  if(elm.classList.contains('invisible'))
    elm.classList.remove('invisible');
};

var Graphs = {
  shuffleExistingCanvas: function(){
    var hidden = document.querySelector('canvas.gone');
    if(hidden){
      hidden.remove();
    }

    var previous = document.querySelector('canvas.previous');
    if(previous){
      previous.classList.add('gone');
      previous.classList.remove('previous');
    }

    var current = document.querySelector('canvas.current');
    if(current){
      current.classList.add('previous');
      current.classList.remove('current');
    }
  },

  addRound: function(){
    Graphs.removeAllTooltip();
    Graphs.shuffleExistingCanvas();

    var wrapper = document.getElementById('chartWrapper');
    var canvas = Graphs.currentCanvas = document.createElement('canvas');
    canvas.classList.add('current');
    wrapper.appendChild(canvas);
    canvas.height = 600;
    canvas.width = 900;

    var ctx = canvas.getContext('2d');

    Graphs.current = new Chart(ctx).Bar(initialData, {
      scaleBeginAtZero: true,
      scaleShowGridLines: false,
      scaleShowVerticalLines: false,
      barShowStroke: false,
      responsive : true,

      barValueSpacing: 20, //TODO - vary based on number of columns

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

          elm.style.top = (chart.offsetTop+bar.y)+"px";
        }
      },
    });

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
    Graphs.current.datasets[0].bars[i].value = v;

    Graphs.current.update();
  }
};