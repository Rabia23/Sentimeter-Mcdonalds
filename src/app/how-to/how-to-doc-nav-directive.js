(function() {
  angular.module('livefeed.how_to')

  .directive('docNav', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        window.initMobileNav();
      }
    };
  });

})();