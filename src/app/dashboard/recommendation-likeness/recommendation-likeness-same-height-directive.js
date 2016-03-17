(function() {
  angular.module('livefeed.dashboard.recommendation_likeness')

  .directive('sameRecommendationHeight', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
         window.initSameHeight();
      }
    };
  });
})();