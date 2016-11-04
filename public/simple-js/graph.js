
var TARGET_BAR_THICKNESS = 55;
var TARGET_BAR_SPACING = 20*2;
var MAX_AREA_HEIGHT = 750;

var PAGE_FADE_DURATION = 500;

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

  if(!Graphs.currentCanvas.classList.contains('current'))
    elm.classList.add('pending');
};

var Graphs = {
  columnWidth: 90,
  currentRole: null,
  currentRound: -1,

  updating: false,

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

  addRound: function(setCurrent){
    Graphs.removeAllTooltip();
    Graphs.shuffleExistingCanvas();

    var wrapper = document.getElementById('chartWrapper');
    var canvas = Graphs.currentCanvas = document.createElement('canvas');
    wrapper.appendChild(canvas);
    canvas.height = 550;
    canvas.width = 850;

    if (setCurrent)
      canvas.classList.add('current');

    var ctx = canvas.getContext('2d');

    var barSpacing = Graphs.barSpacing = TARGET_BAR_SPACING/2;

    var chartHeight = (TARGET_BAR_SPACING + TARGET_BAR_THICKNESS) * Graphs.myLabels.length;
    var marginTop = (MAX_AREA_HEIGHT - chartHeight)/2;
    wrapper.style.height = chartHeight+"px";
    canvas.style.marginTop = marginTop + "px";
    document.querySelector('#chartLabels').style.marginTop = (marginTop+45) + "px";

    console.log("spacing", barSpacing, "height", chartHeight)


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
      imageSmoothingEnabled: false,

      barShowStroke: false,
      responsive : true,

      barValueSpacing: barSpacing-0,

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
    console.log("render", animate)

    Graphs.current.options.animation = !!animate;
    Graphs.current.update();
    Graphs.current.options.animation = false;
  },

  removeAllTooltip: function(){
    var elms = document.querySelectorAll('.myTooltip');

    for(var i in elms){
      if(elms[i].classList)
        elms[i].classList.add('invisible');
    }
  },

  createLabels: function(){
    var wrapper = document.querySelector('#chartLabels');

    if(wrapper.innerHTML.length > 10)
      wrapper.innerHTML = "";

    var labelCount = Graphs.myLabels.length;

    for(var i = 0; i < labelCount; i++){
      var name = Graphs.myLabels[i].name.toUpperCase();
      parts = name.trim().split(" ");
      name = parts[parts.length-1];

      var elm = document.createElement('div');
      elm.classList.add('myLabel')
      elm.setAttribute('id', 'graphLabel'+i);
      elm.setAttribute('data-id', Graphs.myLabels[i].id);
      elm.innerHTML = name;
      // elm.style.marginTop = (Graphs.barSpacing*2)+"px";
      wrapper.appendChild(elm);
    }
  },

  setTitle: function(title){
    document.querySelector('#graphRoleTitle').innerHTML = title.toUpperCase();
  },

  showHideGraph: function(vis, cb){
    if (!cb) cb = function(){};

    // console.log("SHOW/HIDE", vis)

    var elm = document.querySelector('.main');
    if (vis){
      if (!elm.classList.contains("invisibleMain"))
        return cb();

      elm.classList.remove("invisibleMain");
    } else {
      if (elm.classList.contains("invisibleMain"))
        return cb();

      elm.classList.add("invisibleMain");
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
    if (Graphs.updating)
      return;

    // console.log("SET", xml);
    const positionElm = xml.querySelector('position');
    var round = xml.querySelector('rounds round:last-child');

    // TODO - TESTING MODE BELOW:
    // var rounds = xml.querySelectorAll('rounds round');
    // round = rounds[Math.floor(Math.random() * rounds.length)];
    console.log(round)

    // If role has changed, fade out and back in
    if (Graphs.currentRole != positionElm.id) {
      return Graphs.showHideGraph(false, function(){
        var candidates = xml.querySelectorAll('candidates candidate');

        var labels = $.map(candidates, function(v){
          return {
            id: v.id,
            name: v.innerHTML
          };
        })

        Graphs.shuffleExistingCanvas();
        Graphs.currentRole = positionElm.id;
        Graphs.currentRound = parseInt(round.getAttribute('number'));
        Graphs.setTitle(positionElm.innerHTML);
        Graphs.myLabels = labels;
        Graphs.removeAllTooltip();
        Graphs.addRound(true);
        Graphs.createLabels();
        Graphs.setRoundData(round, false);

        Graphs.showHideGraph(true, function(){
          Graphs.updating = false;
        });
      });
    }

    var newRound = parseInt(round.getAttribute('number'));

    if (newRound == Graphs.currentRound){
      console.log("UPD round", Graphs.currentRound);
      Graphs.setRoundData(round, true);

    } else  {
      console.log("Change round from " + Graphs.currentRound + " to " + newRound);

      Graphs.addRound(false);
      Graphs.currentRound = newRound;

      setTimeout(function() {
        Graphs.setRoundData(round, false);

        Graphs.showHiddenGraph();
      }, 350);
    }

    Graphs.updating = false;
  },

  showHiddenGraph(){
    Graphs.currentCanvas.classList.add('current');

    var tooltips = document.querySelectorAll('.myTooltip.pending');
    for (var i=0; i<tooltips.length; i++){
      tooltips[i].classList.remove('pending');
    }
  },

  startScraping(){
    if (Graphs.scraper)
      return;

    Graphs.scraper = setInterval(function(){
      Graphs.scrapeData();
    }, window.apiInterval);
  }
};