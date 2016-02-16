(function() {
  angular.module('livefeed.dashboard')

  .directive('backGround', function() {
    return {
      restrict: 'A',
      scope: {
        color: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('color', function(watchedData) {
          if(watchedData !== undefined){
            $(ele).css("background-color", scope.color);
          }
        });
      }
    };
  });

})();