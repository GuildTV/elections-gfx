
var TARGET_BAR_THICKNESS = 55;
var TARGET_BAR_SPACING = 20*2;
var MAX_AREA_HEIGHT = 750;

var PAGE_FADE_DURATION = 500;
var ANIMATION_STEPS = 60;

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
  currentRole: null,

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

      animation: false,

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
        Graphs.resizeChart();
      },
    });

    Graphs.createLabels();
  },

  resizeChart(){
    var chart = Graphs.currentCanvas;

    for(var i in Graphs.current.datasets[0].bars){
      var bar = Graphs.current.datasets[0].bars[i];

      var elm = document.getElementById('tooltip'+Math.floor(bar.y+1));
      if(elm == null || elm.classList.contains('invisible'))
        continue;

      elm.style.left = (chart.offsetLeft+bar.x)+"px";
    }
  },

  updateChart(animate){
    console.log("UPD", animate)
    // Graphs.current.options.animationSteps = animate ? ANIMATION_STEPS : 1;
    Graphs.current.options.animation = !!animate;
    Graphs.current.update();
    Graphs.current.options.animation = false;
    // if (!animate)
    //   Graphs.resizeChart();
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

    // var labelCount = Graphs.myLabels.length;
    // Graphs.current.datasets[0].bars[labelCount-1-i].value = v;

    // // Graphs.current.options.animation = true; 
    // Graphs.current.update();
    // Graphs.current.options.animation = false; 
  },

  createLabels: function(){
    var wrapper = document.querySelector('#chartLabels');

    if(wrapper.innerHTML.length > 10)
      wrapper.innerHTML = "";

    var labelCount = Graphs.myLabels.length;

    for(var i = 0; i < labelCount; i++){
      var elm = document.createElement('div');
      elm.classList.add('myLabel')
      elm.setAttribute('id', 'graphLabel'+i);
      elm.setAttribute('data-id', Graphs.myLabels[i].id);
      elm.innerHTML = Graphs.myLabels[i].name;
      elm.style.marginTop = (Graphs.barSpacing*2)+"px";
      wrapper.appendChild(elm);
    }
  },

  setTitle: function(title){
    document.querySelector('#graphRoleTitle').innerHTML = title.toUpperCase();
  },

  showHideGraph: function(vis, cb){
    if (!cb) cb = function(){};

    console.log("SHOW/HIDE", vis)

    var elm = document.querySelector('.main');
    if (vis){
      if (!elm.classList.contains("invisible"))
        return cb();

      elm.classList.remove("invisible");
    } else {
      if (elm.classList.contains("invisible"))
        return cb();

      elm.classList.add("invisible");
    }

    setTimeout(cb, PAGE_FADE_DURATION);
  },

  getLabelIndex: function(id){
    var elms = document.querySelectorAll('.myLabel');
    for(var i = 0; i<elms.length; i++){
      if (elms[i].getAttribute('data-id') == id)
        return i;
    }

    return -1;
  },

  setRoundData: function(round, animate){
    // Remove eliminated state
    var elms = document.querySelectorAll('.myLabel');
    for(var i = 0; i<elms.length; i++){
      if(elms[i].classList)
        elms[i].classList.remove('disabled');
    }

    var results = round.querySelectorAll('result');
    for(var i = 0; i<results.length; i++){
      var res = results[i];

      // Set eliminated when appropriate
      var index = Graphs.getLabelIndex(res.getAttribute('candidate'));
      var eliminated = res.getAttribute('eliminated');
      if (eliminated && elms[index])
        elms[index].classList.add('disabled');

      // Set value
      var labelCount = Graphs.myLabels.length;
      var number = parseInt(res.innerHTML);
      if (isNaN(number))
        number = 0;

      Graphs.current.datasets[0].bars[labelCount-index-1].value = number;
    }

    Graphs.updateChart(animate);
  },

  scrapeData: function(){
    $.ajax(window.apiUrl, {
      cache: false,
      dataType: "xml"
    }).then(function (res){
      window.blah = res;
      Graphs.setData(res);
    })
  },

  setData: function(xml){
    console.log("SET", xml);
    const positionElm = xml.querySelector('position');
    var round = xml.querySelector('rounds:last-child');

    // TODO - TESTING MODE BELOW:
    var rounds = xml.querySelectorAll('rounds round');
    round = rounds[Math.floor(Math.random() * rounds.length)];

    if (Graphs.currentRole != positionElm.id) {
      return Graphs.showHideGraph(false, function(){
        var candidates = xml.querySelectorAll('candidates candidate');

        var labels = $.map(candidates, function(v){
          return {
            id: v.id,
            name: v.innerHTML
          };
        })

        Graphs.currentRole = positionElm.id;
        Graphs.setTitle(positionElm.innerHTML);
        Graphs.myLabels = labels;
        Graphs.removeAllTooltip();
        Graphs.addRound();
        Graphs.createLabels();
        Graphs.setRoundData(round, false);

        Graphs.showHideGraph(true);
      });
    }

    console.log("UNHANDLED");
  }
};