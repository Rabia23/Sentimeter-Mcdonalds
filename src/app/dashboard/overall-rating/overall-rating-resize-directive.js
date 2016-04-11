(function() {
  angular.module('livefeed.dashboard.overall_rating')

  .directive('resize', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        $(window).resize( function(){
          scope.height = $(window).height();
          scope.width = $(window).width();

          if(scope.mainView === false && scope.optionView === false){
            scope.mainRating(scope.option);
          }
          else if(scope.mainView === false && scope.optionView === true){
            scope.optionClick(scope.option_object);
          }
          else {
            scope.mainRating();
          }

        }).resize();
      }
    };
  });
})();