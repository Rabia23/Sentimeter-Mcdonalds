(function () {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .directive('dropMenu', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        branches: '='
      },
      link: function (scope, ele, attrs) {
        scope.$watch('branches', function (branch) {
          if (branch !== undefined) {
            $('#dropdown-button').on('click', function () {
              $timeout(function () {
                jcf.refresh($('#scroller'));
              }, 0.1);
            });
          }
        });
      }
    };
  });

})();