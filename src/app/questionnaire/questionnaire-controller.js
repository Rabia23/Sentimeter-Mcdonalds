(function() {
  angular.module('livefeed.questionnaire')

  .controller( 'QuestionnaireCtrl', function QuestionnaireCtrl( $scope, $state, TokenHandler, Auth, QuestionnaireApi, flashService) {

    QuestionnaireApi.questionnaire_list().$promise.then(function(data){
      if(data.success){
        $scope.questions = data.response;
      }
      else{
        flashService.createFlash(data.message, "danger");
      }
    });

    $scope.detail = function(question_id){
      $state.go("questionnaire_detail", {questionnaireId: question_id});
    };
  });

})();