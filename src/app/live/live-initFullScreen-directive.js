(function() {
    angular.module('livefeed.live')

    .directive('initFullScreen', function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var element = document.documentElement;

          if(element.requestFullScreen) {
            element.requestFullScreen();
          }
          else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          }
          else if(element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          }
        }
      };
    });
})();