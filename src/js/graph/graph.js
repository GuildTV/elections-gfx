
const TARGET_BAR_THICKNESS = 55;
const TARGET_BAR_SPACING = 20*2;
const MAX_AREA_HEIGHT = 750;

const PAGE_FADE_DURATION = 500;

Chart.defaults.global.showScale = false;
Chart.defaults.global.scaleShowLabels = false;
Chart.defaults.global.scaleLineColor = "transparent";
Chart.defaults.global.scaleFontColor = "transparent";
Chart.defaults.global.scaleFontSize = 22;
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.animationEasing = "easeOutCubic";
Chart.defaults.global.animationSteps = 25;

Chart.defaults.global.customTooltips = function(tooltip) {
  if(Graphs.updating || tooltip == false || !tooltip.text)
    return;

  let elm = document.getElementById('tooltip'+Math.floor(tooltip.y));

  const chart = Graphs.currentCanvas;

  if(!elm){
    elm = document.createElement('span');
    document.getElementById('chartWrapper').appendChild(elm);   
    elm.setAttribute('id', 'tooltip'+Math.floor(tooltip.y)); 
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
    const hidden = document.querySelector('canvas.gone');
    if(hidden){
      hidden.remove();
    }

    const current = document.querySelector('canvas.current');
    if(current){
      current.classList.add('gone');
      current.classList.remove('current');
    }
  },

  addRound: function(setCurrent){
    Graphs.removeAllTooltip();
    Graphs.shuffleExistingCanvas();

    const wrapper = document.getElementById('chartWrapper');
    const canvas = Graphs.currentCanvas = document.createElement('canvas');
    wrapper.appendChild(canvas);
    canvas.height = 550;
    canvas.width = 850;

    if (setCurrent)
      canvas.classList.add('current');

    const ctx = canvas.getContext('2d');

    let barSpacing = Graphs.barSpacing = TARGET_BAR_SPACING/2;
    if (Graphs.myLabels.length > 8){
      barSpacing *= 0.35;
      Graphs.barSpacing *= 0.35;
    }

    const chartHeight = (barSpacing*2 + TARGET_BAR_THICKNESS) * Graphs.myLabels.length;
    const marginTop = (MAX_AREA_HEIGHT - chartHeight)/2;
    wrapper.style.height = chartHeight+"px";
    canvas.style.marginTop = marginTop + "px";
    document.querySelector('#chartLabels').style.marginTop = (marginTop+45) + "px";

    console.log("spacing", barSpacing, "height", chartHeight);

    const labels = [];
    Graphs.myLabels.forEach(() => labels.push(""));
    
    const initialData = {
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
    const chart = Graphs.currentCanvas;

    for(let i in Graphs.current.datasets[0].bars){
      const bar = Graphs.current.datasets[0].bars[i];

      let elm = document.getElementById('tooltip'+Math.floor(bar.y));
      if (elm == null)
         elm = document.getElementById('tooltip'+Math.floor(bar.y+1));
      if(elm == null || elm.classList.contains('invisible'))
        continue;

      elm.style.transform =  "translateX("+Math.round(chart.offsetLeft+bar.x)+"px)";
    }
  },

  updateChart(animate){
    console.log("render", animate);

    Graphs.current.options.animation = !!animate;
    Graphs.current.update();
    Graphs.current.options.animation = false;
  },

  removeAllTooltip: function(){
    const elms = document.querySelectorAll('.myTooltip');

    for(let i in elms){
      if(elms[i].classList)
        elms[i].classList.add('invisible');
    }
  },

  createLabels: function(){
    const wrapper = document.querySelector('#chartLabels');

    if(wrapper.innerHTML.length > 10)
      wrapper.innerHTML = "";

    const labelCount = Graphs.myLabels.length;
  
    for(let i = 0; i < labelCount; i++){
      const key = Graphs.myLabels[i].name;
    
      let name = key.toUpperCase();
      if (!Graphs.myLabels[i].useFull){
        const parts = name.trim().split(" ");
        name = parts[parts.length-1];
      }

      const elm = document.createElement('div');
      elm.classList.add('myLabel');
      elm.setAttribute('id', 'graphLabel'+i);
      elm.setAttribute('data-id', Graphs.myLabels[i].id);
      elm.innerHTML = name;
      elm.style.marginTop = (1+Graphs.barSpacing*2)+"px";
      wrapper.appendChild(elm);
    }
  },

  setTitle: function(title){
    document.querySelector('#graphRoleTitle').innerHTML = title;
  },

  showHideGraph: function(vis, cb){
    if (!cb) cb = function(){};

    // console.log("SHOW/HIDE", vis)

    const elm = document.querySelector('.main');
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
    const elms = document.querySelectorAll('.myLabel');
    for(let i = 0; i<elms.length; i++){
      if (elms[i].getAttribute('data-id') == id)
        return i;
    }

    return -1;
  },

  setRoundData: function(round, animate){
    const changed = [];

    // Remove eliminated state
    const elms = document.querySelectorAll('.myLabel');
    for(let i = 0; i<elms.length; i++){
      if(elms[i].classList) {
        changed[i] = elms[i].classList.contains('disabled');
        elms[i].classList.remove('disabled');
      }
    }

    if (round != null){
      const results = round.querySelectorAll('result');
      for(let i = 0; i<results.length; i++){
        const res = results[i];

        // Set eliminated when appropriate
        const index = Graphs.getLabelIndex(res.getAttribute('candidate'));
        const eliminated = res.getAttribute('eliminated');
        if (eliminated && elms[index]){
          changed[index] = !changed[index];
          elms[index].classList.add('disabled');
        }

        // Set value
        const labelCount = Graphs.myLabels.length;
        let number = parseInt(res.getAttribute('votes'));
        if (isNaN(number))
          number = 0;

        // if (Graphs.current.datasets[0].bars[labelCount-index-1].value != number)
        //   changed[i] = true;

        if (Graphs.current.datasets[0].bars[labelCount-index-1])
        Graphs.current.datasets[0].bars[labelCount-index-1].value = number;
      }
    }

    for(let i=0; i<elms.length; i++){
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
      console.log(res)
      Graphs.setData(res);
    });
  },

  setData: function(xml){
    if (Graphs.updating)
      return;

    // console.log("SET", xml);
    const positionElm = xml.querySelector('title');
    const round = xml.querySelector('rounds round:last-child');

    // TODO - TESTING MODE BELOW:
    // var rounds = xml.querySelectorAll('rounds round');
    // round = rounds[Math.floor(Math.random() * rounds.length)];

    // If role has changed, fade out and back in
    if (Graphs.currentRole != positionElm.innerHTML) {
      return Graphs.showHideGraph(false, function(){
        const candidates = xml.querySelectorAll('candidates candidate');

        const labels = $.map(candidates, function(v){
          let name = v.innerHTML;

          const res = {
            id: v.id,
            name: name,
            useFull: false,
          };
          console.log(name);
          // if (window.CONFIG.Graph.LookupTable[positionElm.innerHTML] !== undefined && window.CONFIG.Graph.LookupTable[positionElm.innerHTML][name] !== undefined){
          //   res.name = window.CONFIG.Graph.LookupTable[positionElm.innerHTML][name];
          //   res.useFull = true;
          // }
      
          return res;
        });

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

    const newRound = parseInt(!round ? 0 : round.getAttribute('number'));

    if (newRound == Graphs.currentRound){
      // console.log("UPD round", Graphs.currentRound);
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

    const tooltips = document.querySelectorAll('.myTooltip.pending');
    for (let i=0; i<tooltips.length; i++){
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