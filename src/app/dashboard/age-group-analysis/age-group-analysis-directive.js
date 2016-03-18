(function() {
  angular.module('livefeed.dashboard.age_group_analysis')

  .directive('ageGroupAnalysis', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watchCollection('data', function(watchedData) {
          if(watchedData !== undefined){
            var data = scope.data;
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
              "graphs": [
                {
                  "balloonText": "[[title]]: [[value]]",
                  "fillAlphas": 1,
                  "id": "AmGraph-1",
                  "title": "MALE",
                  "type": "column",
                  "valueField": "column-1"
                },
                {
                  "balloonText": "[[title]]: [[value]]",
                  "fillAlphas": 1,
                  "id": "AmGraph-2",
                  "title": "FEMALE",
                  "type": "column",
                  "valueField": "column-2"
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
                  "fontSize": 12
                }
              ],
              "allLabels": [],
              "balloon": {},
              "legend": {
                "enabled": true,
                "useGraphSettings": true
              },
              "titles": [],
              "dataProvider": data
            });
          }  
        });
      }
    };
  });
})();