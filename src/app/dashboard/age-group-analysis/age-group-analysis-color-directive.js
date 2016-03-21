(function() {
  angular.module('livefeed.dashboard.age_group_analysis')

  .directive('genderBullet', function() {
    return {
      restrict: 'A',
      scope: {
        color: '='
      },
      link: function(scope, ele, attrs) {
        $(ele).css("background-color", scope.color);
      }
    };
  });
})();