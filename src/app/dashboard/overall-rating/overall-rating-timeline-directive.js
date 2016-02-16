(function() {
  angular.module('livefeed.dashboard.overall_rating')

  .directive('timeLine', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        action: '&'
      },
      link: function(scope, ele, attrs) {
        scope.$watch('data', function(watchedData) {
          var chart;
          if (watchedData !== undefined) {

            var data = scope.data;
            var graphs = [];
            _.each(data[0],function(graph_data){
              graphs.push({
                  "bullet": "round",
                  "bulletBorderAlpha": 1,
                  "bulletSize": 8,
                  "bulletBorderColor": graph_data.color,
                  "bulletColor": "#FFF",
                  "color": "#FFFFFF",
                  "fillAlphas": 0.3,
                  "fillColors": graph_data.color,
                  "id": graph_data.id,
                  "legendColor": graph_data.color,
                  "lineColor": graph_data.lineColor,
                  "lineThickness": 3,
                  "negativeFillAlphas": 0,
                  "title": graph_data.title,
                  "type": "smoothedLine",
                  "valueField": graph_data.valueField,
                  "visibleInLegend": false
              });
            });
            chart = AmCharts.makeChart("chartdiv",
            {
              "type": "serial",
              "marginTop": 15,
              "marginLeft": 30,
              "autoMargins": false,
              //"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
              "balloonDateFormat": "",
              "categoryField": "category",
              "plotAreaBorderColor": "#FFFE6E",
              "colors": [
                  "#FF6600",
                  "#FCD202",
                  "#B0DE09",
                  "#0D8ECF",
                  "#2A0CD0",
                  "#CD0D74",
                  "#CC0000",
                  "#00CC00",
                  "#0000CC",
                  "#DDDDDD",
                  "#999999",
                  "#333333",
                  "#990000"
              ],
              "startDuration": 0,
              "startEffect": "easeOutSine",
              "borderColor": "#FFFE6E",
              "color": "#FFF",
              "fontFamily": "'open Sans', open Sans",
              "fontSize": 12,
              "handDrawScatter": 0,
              "handDrawThickness": 0,
              "theme": "default",
              "categoryAxis": {
                  "equalSpacing": true,
                  "firstDayOfWeek": 0,
                  "startOnAxis": false,
                  "gridPosition": "start",
                  //"twoLineMode": true,
                  "axisAlpha": 0.4,
                  "axisColor": "#CED4CE",
                  "color": "#808080",
                  "fillColor": "#A7AAA7",
                  "gridAlpha": 0.4,
                  "gridColor": "#CED4CE",
                  "gridCount": 20,
                  "minHorizontalGap": 0,
                  "minorGridAlpha": 0,
                  "minVerticalGap": 0,
                  "showFirstLabel": true,
                  "showLastLabel": true,
                  "tickLength": 0,
                  "fontSize": 12
              },
              "trendLines": [],
              "graphs": graphs,
              "guides": [],
              "valueAxes": [
                  {
                      "id": "ValueAxis-1",
                      "synchronizationMultiplier": 0,
                      "axisAlpha": 0.4,
                      "axisColor": "#CED4CE",
                      "color": "#808080",
                      "fillColor": "#A7AAA7",
                      "gridAlpha": 0.4,
                      "gridColor": "#CED4CE",
                      "gridCount": 20,
                      "tickLength": 0,
                      "title": "",
                      "fontSize": 12

                  }
              ],
              "allLabels": [],
              "balloon": {
                  "showBullet": true
              },
              "legend": {
                  "enabled": false,
                  "color": "#000000",
                  "rollOverGraphAlpha": 0.79
              },
              "titles": [
                  {
                      "color": "#FFFFFF",
                      "id": "Title-1",
                      "size": 15,
                      "text": ""
                  }
              ],
              "dataProvider": data[1]
            });
            $("#chartdiv").find("svg").find("text").each(function(index, value){
              if($(value).children().html() == "Late Night"){
                var string = $(value).parents("g").attr("transform").split(",")[1];
                var string2 = $(value).parents("g").attr("transform").split(",")[0];
                var y = parseInt(string.split(")")[0], 10) - 1;
                var x = parseInt(string2.split("(")[1], 10);
                $($(value).parents("g")[0]).attr("transform", "translate("+ x + "," + y + ")");
              }
            });
            window.initSameHeight();
            chart.addListener("clickGraphItem", function(event){
              scope.$apply(scope.action({option_object: event}));
            });
          }

        });
      }
    };
  });
})();