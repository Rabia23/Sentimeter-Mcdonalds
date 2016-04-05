(function() {
    angular.module('livefeed.questionnaire')
    .directive('questionnairePieChart', function($timeout) {
      return {
        restrict: 'A',
        scope: {
          data: '='
        },
        link: function(scope, ele, attrs) {
          var chart;
          scope.$watch('data', function(watchedData) {
            if(watchedData !== undefined){
              var data = scope.data;
              chart = AmCharts.makeChart(data[0],
              {
                "type": "pie",
                "pullOutDuration": 0,
                "pullOutRadius": 0,
                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b></span>",
                "innerRadius": "40%",
                "startDuration": 0,
                "color": "#FFF",
                "colors": [
                  "#f7ca17",
                  "#e84c3d "
                ],
                "marginTop": 10,
                "marginBottom": 25,
                "autoMargins": false,
                "labelText": "[[title]] : [[value]]",
                "labelTickColor" : "#FFF",
                "labelRadius" : -90,
                "labelColorField": "#FFF",
                "labelsEnabled": false,
                "titleField": "category",
                "valueField": "column-1",
                "fontFamily": "'open Sans', open Sans",
                "fontSize": 17,
                "allLabels": [],
                "balloon": { "fixedPosition": true },
                "legend": {},
                "titles": [],
                "dataProvider": data[1]
              });
              $timeout(function(){
                  window.initSameHeight();
              },500);

            }
          });
        }
      };
    });
})();
