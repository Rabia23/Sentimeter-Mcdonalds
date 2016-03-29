(function() {
  angular.module('livefeed.dashboard.category_performance_analysis')

  .directive('progressBarSpacing', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },

      link: function(scope, ele, attrs){

        var first_time = true;
        var time;
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            if(first_time){
              time = 4000;
              first_time = false;
            }
            else{
              time = 200;
            }
            $timeout(function () {
              var height = $(".business-segment").find(".chart-outer").height();
              $(".business-segment").find(".chart-outer").find(".progress-container").css("height", height);
              $(".business-segment").find(".chart-outer").find(".progress-container").find(".progress-area").css("height", height);
              var children = $(".business-segment").find(".chart-outer").find(".progress-container").find(".progress-area").children();
              var length = $(".business-segment").find(".chart-outer").find(".progress-container").find(".progress-area").children().length;
              var child_height = height/length;
              _.each(children, function(value, index){
                $(value).css("height", child_height);
              });
            }, time);
          }
        });
      }
    };
  });
})();