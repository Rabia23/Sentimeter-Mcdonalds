(function() {
  angular.module('livefeed')

  .directive('customForm', function() {
    return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          window.initCustomForms();
        }
    };
  });

})();