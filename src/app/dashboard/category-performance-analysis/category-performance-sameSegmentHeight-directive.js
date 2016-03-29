(function() {
  angular.module('livefeed.dashboard.category_performance_analysis')

  .directive('sameSegmentHeight', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('data', function(watchedData) {
          if(watchedData !== undefined){
            window.initSameHeight();
          }
        });
      }
    };
  });
})();
