(function() {
    angular.module('livefeed.dashboard.positive_negative_feedback')

    .directive('customForm', function(){
      return {
        restrict: 'A',
        scope: {
          comments: '='
        },
        link: function(scope, ele, attrs){
          scope.$watch('comments', function(watchedComments) {
            if(watchedComments !== undefined){
              window.initCustomForms();
            }
          });

        }
      };
    });

})();