(function() {
  angular.module('livefeed.dashboard.age_group_analysis')

  .directive('sameRecommendationHeight', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
         window.initSameHeight();
      }
    };
  });
})();