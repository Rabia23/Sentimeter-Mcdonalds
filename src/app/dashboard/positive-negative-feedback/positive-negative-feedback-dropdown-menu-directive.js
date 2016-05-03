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
            console.log('inside custom form block');
            $('#single-button2').on('click', function () {
              $timeout(function () {
                window.initCustomForms();
              }, 0.1);
            });
          }
        });
      }
    };
  });

})();