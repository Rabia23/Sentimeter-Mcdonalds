(function() {
  angular.module('livefeed.dashboard.overall_rating')

  .directive('sameRatingHeight', function() {
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