(function() {
  angular.module('livefeed.questionnaire')
  .directive('questionSameHeight', function() {
    return {
      restrict: 'A',
      scope: {
        questionnaire: '='
      },
      link: function(scope, ele, attrs) {
        scope.$watch('questionnaire', function(watchedData) {
          if (watchedData !== undefined) {
            window.initSameHeight();
          }
        });
      }
    };
  });
})();