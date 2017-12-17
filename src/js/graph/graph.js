
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
Chart.defaults.global.animationEasing = "easeOutCubic";
Chart.defaults.global.animationSteps = 25;

window.LOOKUP_TABLE = {
  "Activities &amp; Development Officer": {
    "Shannon Farm 'N' Fresh": "Shannon Farmer",
    "Alina": "Alina Morosan",
  },
  "Welfare Officer": {
    "Agony Aunt Anna ": "Anna Lyndon",
    "Mother Hen": "Henrietta Green",
  },
  "Housing &amp; Community Officer ": {
    'Joanna "Iguana"': "Joanna Prejbeanu"
  }
}

Chart.defaults.global.customTooltips = function(tooltip) {
  if(Graphs.updating || tooltip == false || !tooltip.text)
    return;

  var elm = document.getElementById('tooltip'+Math.floor(tooltip.y))

  var chart = Graphs.currentCanvas;

  if(!elm){
    elm = document.createElement('span');
    document.getElementById('chartWrapper').appendChild(elm);   
    elm.setAttribute('id', 'tooltip'+Math.floor(tooltip.y)) 
  }

  elm.innerHTML = tooltip.text;
  elm.style.top = (chart.offsetTop+tooltip.y)+"px";
  elm.classList.add('myTooltip');
  elm.style.marginTop = -(elm.offsetHeight/2)+"px";
  elm.style.transform = "translateX("+Math.round(chart.offsetLeft+tooltip.x)+"px)";

  if(elm.classList.contains('invisible'))
    elm.classList.remove('invisible');

  if(!Graphs.currentCanvas.classList.contains('current'))
    elm.classList.add('pending');
};

const Graphs = {
  columnWidth: 90,
  currentRole: null,
  currentRound: -1,

  updating: false,
  inflight: false,

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

      var elm = document.getElementById('tooltip'+Math.floor(bar.y));
      if (elm == null)
         elm = document.getElementById('tooltip'+Math.floor(bar.y+1));
      if(elm == null || elm.classList.contains('invisible'))
        continue;

      elm.style.transform =  "translateX("+Math.round(chart.offsetLeft+bar.x)+"px)";
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

  createLabels: function(title){
    var wrapper = document.querySelector('#chartLabels');

    if(wrapper.innerHTML.length > 10)
      wrapper.innerHTML = "";

    var labelCount = Graphs.myLabels.length;
  
    for(var i = 0; i < labelCount; i++){
    var key = Graphs.myLabels[i].name;
    
    
    
      var name = key.toUpperCase();
      const parts = name.trim().split(" ");
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
    var changed = [];

    // Remove eliminated state
    var elms = document.querySelectorAll('.myLabel');
    for(var i = 0; i<elms.length; i++){
      if(elms[i].classList) {
        changed[i] = elms[i].classList.contains('disabled');
        elms[i].classList.remove('disabled');
      }
    }

    if (round != null){
      var results = round.querySelectorAll('result');
      for(var i = 0; i<results.length; i++){
        var res = results[i];

        // Set eliminated when appropriate
        var index = Graphs.getLabelIndex(res.getAttribute('candidate'));
        var eliminated = res.getAttribute('eliminated');
        if (eliminated && elms[index]){
          changed[index] = !changed[index];
          elms[index].classList.add('disabled');
        }

        // Set value
        var labelCount = Graphs.myLabels.length;
        var number = parseInt(res.getAttribute('votes'));
        if (isNaN(number))
          number = 0;

        // if (Graphs.current.datasets[0].bars[labelCount-index-1].value != number)
        //   changed[i] = true;

        Graphs.current.datasets[0].bars[labelCount-index-1].value = number;
      }
    }

    for(var i=0; i<elms.length; i++){
      if (!changed[i])
        continue;

      Graphs.removeAllTooltip();
      break;
    }

    Graphs.updateChart(animate);
  },

  scrapeData: function(){
    if (Graphs.inflight)
      return;
    
    Graphs.inflight = true;
    $.ajax(window.apiUrl, {
      cache: false,
      dataType: "xml"
    }).then(function (res){
      Graphs.inflight = false;
      Graphs.setData(res);
    })
  },

  setData: function(xml){
    if (Graphs.updating)
      return;

    // console.log("SET", xml);
    const positionElm = xml.querySelector('title');
    var round = xml.querySelector('rounds round:last-child');

    // TODO - TESTING MODE BELOW:
    // var rounds = xml.querySelectorAll('rounds round');
    // round = rounds[Math.floor(Math.random() * rounds.length)];

    // If role has changed, fade out and back in
    if (Graphs.currentRole != positionElm.innerHTML) {
      return Graphs.showHideGraph(false, function(){
        var candidates = xml.querySelectorAll('candidates candidate');

        var labels = $.map(candidates, function(v){
        var name = v.innerHTML;
        console.log(name);
        if (window.LOOKUP_TABLE[positionElm.innerHTML] !== undefined && window.LOOKUP_TABLE[positionElm.innerHTML][name] !== undefined){
          name = window.LOOKUP_TABLE[positionElm.innerHTML][name];
          }
      
          return {
            id: v.id,
            name: name
          };
        })

        Graphs.shuffleExistingCanvas();
        Graphs.currentRole = positionElm.innerHTML;
        Graphs.currentRound = parseInt(!round ? 0 : round.getAttribute('number'));
        Graphs.setTitle(positionElm.innerHTML);
        Graphs.myLabels = labels;
        Graphs.addRound(true);
        Graphs.createLabels(positionElm.innerHTML);
        Graphs.removeAllTooltip();
        Graphs.setRoundData(round, false);

        Graphs.showHideGraph(true, function(){
          Graphs.updating = false;
        });
      });
    }

    var newRound = parseInt(!round ? 0 : round.getAttribute('number'));

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
  },

  stopScraping(){
    if (!Graphs.scraper)
      return;

    clearInterval(Graphs.scraper);
    Graphs.scraper = null;
  }
};

export default Graphs;