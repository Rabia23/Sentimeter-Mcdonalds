(function() {
  angular.module('livefeed.dashboard.recommendation_likeness')

  .directive('recommendationLikeness', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            var data = scope.data;
            var chart = AmCharts.makeChart("barchartdiv",
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
              "graphs": [
                {
                  "colorField": "color",
                  "fillAlphas": 1,
                  "id": "AmGraph-1",
                  "lineColorField": "color",
                  "title": "graph 1",
                  "type": "column",
                  "valueField": "column-1"
                }
              ],
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
              "titles": [],
              "dataProvider": data
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
