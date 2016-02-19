(function() {
  angular.module('livefeed')

  .directive('toggleMenu', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {

        ele.bind("click", function(){
          $("body").toggleClass("mini-navbar");
          window.SmoothlyMenu();
        });
      }
    };
  });

})();