(function() {
    angular.module('livefeed.live')

    .directive('initFullScreen', function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          console.log("in the initFullScreen");
          var element = document.documentElement;
          //var element = document.getElementById("live-dashboard");
          console.log(element);
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