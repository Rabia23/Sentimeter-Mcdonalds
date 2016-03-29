(function() {
  angular.module('livefeed.dashboard.feedback_map')

  .directive('sameMapHeight', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        window.initSameHeight();
      }
    };
  });
})();