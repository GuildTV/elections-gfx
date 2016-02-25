function render(){
  var chart = new CanvasJS.Chart("chartContainer",
  {
    backgroundColor: null,
    interactivityEnabled: false,
    animationEnabled: true,
    axisY: {
        labelFontSize: 0.001,
        labelFontColor: null,
        tickLength: 50,
        tickColor: "transparent",
        lineColor: "transparent",
        gridColor: "transparent",
        maximum: 3200
    },
    axisX: {
      labelFontFamily: "HelveticaNeue-Light",
      labelFontSize: 18,
      labelFontColor: "#333"

      // labelAutoFit: true,
      // labelWrap: false
    },
    theme: "theme2",
    dataPointMaxWidth: 70,
    data: [
    {        
      type: "column",  
      showInLegend: false, 
      indexLabelFontColor: "#333",
      indexLabelFontFamily: "HelveticaNeue-Bold",
      indexLabelFontSize: 25,
      color: "#333d56",
      dataPoints: [      
      {y: 2975, label: "SORENTINO", indexLabel:"2938" },
      {y: 2670,  label: "STRONG" , indexLabel:"1500"},
      {y: 1752,  label: "LINDLAR", indexLabel:"1038"},
      {y: 1545,  label: "Iran", indexLabel:"138"},
      {y: 1160,  label: "Russia"},
      {y: 978, label: "UAE"},
      {y: 206,  label: "US"},        
      {y: 23,  label: "China"}        
      ]
    }   
    ]
  });

  chart.render();
}