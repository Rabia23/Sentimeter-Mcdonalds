(function() {
  angular.module('livefeed.dashboard.category_performance_analysis')

  .directive('barClick', function() {
    return {
      restrict: 'A',
      scope: {
        name: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('name', function(watchedData) {
          if(watchedData !== undefined){
            $(ele).bind("click", function(){

              if(watchedData == "Quality"){
                $("#quality-item").parent().addClass("active");
                scope.$parent.onClick(scope.$parent.QualityID, "Quality");
              }
              else if(watchedData == "Cleanliness"){
                $("#cleanliness-item").trigger("click");
                scope.$parent.onClick(scope.$parent.CleanlinessID, "Cleanliness");
              }
              else if(watchedData == "Service"){
                $("#service-item").trigger("click");
                scope.$parent.onClick(scope.$parent.ServiceID, "Service");
              }
            });

          }
        });
      }
    };
  });
})();