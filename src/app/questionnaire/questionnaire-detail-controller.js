(function() {
  angular.module('livefeed.questionnaire')

  .controller( 'QuestionnaireDetailCtrl', function QuestionnaireDetailCtrl( $scope, $rootScope, Global, TokenHandler, Auth, flashService, $stateParams, QuestionnaireApi) {

    // TODO Identaation is not right
     var inc = 1;
     $scope.all_zero = true;
     var questionnaireId = $stateParams.questionnaireId;
     QuestionnaireApi.questionnaire_detail(questionnaireId).$promise.then(function(data){

      if(data.success){
        $scope.questionnaire = data.response.questionnaire;
        $scope.questions = data.response.analysis;
        _.each($scope.questions, function(question){
          if (question.total_count > 0) {
              $scope.all_zero = false;
          }
          //TODO take 11 and 10 to an enum
          if(question.type == 11){
            var question_bar_chart = getBarChartData(question.feedbacks, question.total_count);
             question["question_bar_chart"] = question_bar_chart;
          }
          else if(question.type == 10){
            var question_pie_chart= getPieChartData(question.feedbacks);
            question["question_pie_chart"] = ["piechart-" + inc, question_pie_chart];
            inc = inc + 1;
          }
        });
      }
      else{
        flashService.createFlash(data.message, "danger");
      }

     });

     // TODO identation is not correct
     // TODO I can not see the Global service in the folder
     function getBarChartData(feedbacks, feedback_count){
       var question_analysis = _.map(feedbacks,  function(data, index){
        return {
          id: data.option_id,
          name: data.option__text,
          count: data.count,
          percentage: data.count === 0 ? 0 : Math.round((data.count/feedback_count)*100),
          colour: Global.topConcernsColors(index)
          //priority: Global.questionnaireBarChartClass[data.option__text][0]
        };
      });
      //question_analysis = _.sortBy(question_analysis, function (value) { return value.priority;  });
      return question_analysis;
    }

    // Identation not correct

    function getPieChartData(feedbacks){
       var pie_chart_data = [];
       _.each(feedbacks,  function(value){
          pie_chart_data.push({"category": value.option__text, "column-1": value.count});
       });
      return pie_chart_data;
    }
  });

})();