(function() {
  angular.module('livefeed.dashboard.age_group_analysis')

  .directive('recommendationLikeness', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
        console.log("recommendation likeness directive");
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
              "fontSize": 12
            }
          ],
          "allLabels": [],
          "balloon": {},
          "titles": [],
          "dataProvider": [
            {
                "category": "1",
                "column-1": 8
            },
            {
                "category": "2",
                "column-1": 16
            },
            {
                "category": "3",
                "column-1": 2
            },
            {
                "category": "4",
                "column-1": 7
            },
            {
                "category": "5",
                "column-1": 5
            },
            {
                "category": "6",
                "column-1": 9
            },
            {
                "category": "7",
                "column-1": 4
            },
            {
                "category": "8",
                "column-1": 15
            },
            {
                "category": "9",
                "column-1": 10
            },
            {
                "category": "10",
                "column-1": 17
            }
          ]
        });
        $timeout(function(){
          window.initSameHeight();
        },1000);
      }
    };
  });
})();