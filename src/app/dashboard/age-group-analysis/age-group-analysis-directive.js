(function() {
  angular.module('livefeed.dashboard.age_group_analysis')

  .directive('ageGroupAnalysis', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
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
              "balloonText": "[[title]] of [[category]]:[[value]]",
              "fillAlphas": 1,
              "id": "AmGraph-1",
              "title": "graph 1",
              "type": "column",
              "valueField": "column-1"
            },
            {
              "balloonText": "[[title]] of [[category]]:[[value]]",
              "fillAlphas": 1,
              "id": "AmGraph-2",
              "title": "graph 2",
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
          "dataProvider": [
            {
              "category": "category 1",
              "column-1": 8,
              "column-2": 5
            },
            {
              "category": "category 2",
              "column-1": 6,
              "column-2": 7
            },
            {
              "category": "category 3",
              "column-1": 2,
              "column-2": 3
            }
          ]
        });
      }
    };
  });
})();