(function() {
    angular.module('livefeed.live')

    .directive('initSlide', function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          window.initSlideShow();
        }
      };
    });
})();