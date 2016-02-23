(function() {
  angular.module('livefeed.promotions')

  .directive('promotionSameHeight', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        promotion: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('promotion', function(watchedData) {
          if (watchedData !== undefined) {
            window.initSameHeight();
          }
        });
      }
    };
  });
})();