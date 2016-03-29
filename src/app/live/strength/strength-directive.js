(function() {
  angular.module( 'livefeed.live.strength')

  .directive('strength', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {

        var graph_show = false;
        var live_top_concerns;
        // TODO this code is repeating in 2 directives, make a service for this
        var width = screen.width;
        var marginRight = "-35%";
        var marginLeft = "-15%";
        var fontsize = 40;
        if((width <= 1439) && (width >= 1201)){
          marginRight = "0";
          marginLeft = "0";
          fontsize = 30;
        }else if(width <= 1200){
          marginRight = "0";
          marginLeft = "0";
          fontsize = 25;
        }

        var vertical_gap = 0;
        var ms_ie = false;
        var ua = window.navigator.userAgent;
        var old_ie = ua.indexOf('MSIE ');
        var new_ie = ua.indexOf('Trident/');

        if ((old_ie > -1) || (new_ie > -1)) {
          ms_ie = true;
        }

        if ( ms_ie ) {
          vertical_gap = -20;
        }

        scope.$watch('data', function(watchedData) {

          if(watchedData !== undefined){
            var data = scope.data;
            if(!graph_show){
              live_strength = AmCharts.makeChart("strengthPieChart",{
                "type": "pie",
                "angle": 25,
                "startDuration": 0,
                "pullOutDuration": 0,
                "pullOutRadius": 0,
                "balloonText": "<span style='font-size:20px'>[[title]]</span><br><span style='font-size:16px'>[[value]]</span>",
                "depth3D": 55,
                "innerRadius": "35%",
                "marginRight": marginRight,
                "marginLeft": marginLeft,
                "marginTop": "3%",
                "marginBottom": "14%",
                "autoMargins":false,
                "labelRadius": -75,
                "labelText": "[[value]]",
                "color": "#FFFFFF",
                "labelsEnabled": true,
                "colors": [
                    "#4CCC72",
                    "#3598DC",
                    "#E74D3D",
                    "#F0C547",
                    "#9C59B8"
                ],
                "titleField": "category",
                "valueField": "column-1",
                "fontFamily": "'Oswald', sans-serif",
                "fontSize": 23,
                "allLabels": [],
                "balloon": {},
                "legend": {
                  "enabled": true,
                  "switchable" : false,
                  "align": "center",
                  "equalWidths": false,
                  "markerLabelGap": 25,
                  "markerSize": 20,
                  "markerType": "circle",
                  "valueText": "",
                  "valueWidth": 0,
                  "position": "right",
                  "marginRight":80,
                  "marginTop": 50,
                  "autoMargins":false,
                  "fontSize": fontsize,
                  "verticalGap": vertical_gap
                },
                "titles": [],
                "dataProvider": data
              });
              graph_show = true;
            }
            else{
              live_strength.dataProvider = data;
              live_strength.validateData();
            }
          }
        });
      }
    };
  });

})();
