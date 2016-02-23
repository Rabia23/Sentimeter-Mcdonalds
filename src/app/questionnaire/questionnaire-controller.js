(function() {
  angular.module('livefeed.questionnaire')

  .controller( 'QuestionnaireCtrl', function QuestionnaireCtrl( $scope, TokenHandler, Auth) {
     console.log("quesionnaire controller");
  })
  
  .directive('questionSameHeight', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        scope.$watch(function(watchedData) {
          if (watchedData !== undefined) {
            window.initSameHeight();
          }
        });
      }
    };
 });

})();