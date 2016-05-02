(function() {
  angular.module('livefeed.dashboard.age_group_analysis')

  .directive('ageGroupAnalysis', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watchCollection('data', function(watchedData) {
          if(watchedData !== undefined){
            var data = scope.data;
            var graphs = [];
            _.each(data[1],function(dat){
              graphs.push({
                "balloonText": "[[title]]: [[value]]",
                "fillAlphas": 1,
                "id": dat.id,
                "title": dat.title,
                "type": "column",
                "valueField": dat.valueField,
                "color": dat.color,
                "fillColors": dat.color,
                "lineColor": dat.color
              });
            });
            var chart = AmCharts.makeChart("agechartdiv",
            {
              "type": "serial",
              "categoryField": "category",
              "startDuration": 1,
              "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0.4,
                "axisColor": "#CED4CE",
                "color": "#808080",
                "fillColor": "#A7AAA7",
                "gridAlpha": 0.4,
                "gridColor": "#CED4CE",
                "tickLength": 0,
                "fontSize": 12
              },
              "trendLines": [],
              "graphs": graphs,
              "guides": [],
              "valueAxes": [
                {
                  "id": "ValueAxis-1",
                  "axisAlpha": 0.4,
                  "axisColor": "#CED4CE",
                  "color": "#808080",
                  "fillColor": "#A7AAA7",
                  "gridAlpha": 0.4,
                  "gridColor": "#CED4CE",
                  "tickLength": 0,
                  "fontSize": 12,
                  "minimum": 0
                }
              ],
              "allLabels": [],
              "balloon": {},
              "legend": {
                "enabled": true,
                "useGraphSettings": true
              },
              "titles": [],
              "dataProvider": data[0]
            });
            $timeout(function(){
              jQuery('.same-height-parent').sameHeight({
                elements: '.data-block .equal-height',
                flexible: true,
                multiLine: true,
                biggestHeight: true,
                useMinHeight: false
              });
            },200);
          }  
        });
      }
    };
  });
})();
