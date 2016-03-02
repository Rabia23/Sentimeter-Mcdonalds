(function() {
  angular.module('livefeed.questionnaire')

  .controller( 'QuestionnaireDetailCtrl', function QuestionnaireDetailCtrl( $scope, $rootScope, Global, QuestionnaireChartTypeEnum, TokenHandler, Auth, flashService, $stateParams, QuestionnaireApi) {

    var inc = 1;
    $scope.all_zero = true;
    var questionnaireId = $stateParams.questionnaireId;
    
    $scope.today = new Date();

    function resetDates(){
      $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
      };
    }

    resetDates();

    $scope.datePickerOption = {
      eventHandlers: {
        'apply.daterangepicker': function(ev, picker){
          $scope.show_loading = true;
        }
      },
      opens: "left"
    }; 

    QuestionnaireApi.questionnaire_detail(questionnaireId).$promise.then(function(data){

      if(data.success){
        $scope.questionnaire = data.response.questionnaire;
        $rootScope.page_heading = $scope.questionnaire.title;
        $scope.questions = data.response.analysis;
        _.each($scope.questions, function(question){
          if (question.total_count > 0) {
              $scope.all_zero = false;
          }
          if(question.type == QuestionnaireChartTypeEnum.get_bar_chart_value()){
            var question_bar_chart = getBarChartData(question.feedbacks, question.total_count);
             question["question_bar_chart"] = question_bar_chart;
          }
          else if(question.type == QuestionnaireChartTypeEnum.get_pie_chart_value()){
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

    function getBarChartData(feedbacks, feedback_count){
      var question_analysis = _.map(feedbacks,  function(data, index){
        return {
          id: data.option_id,
          name: data.option__text,
          count: data.count,
          percentage: data.count === 0 ? 0 : Math.round((data.count/feedback_count)*100),
          colour: Global.topConcernsColors(index)
        };
      });
      return question_analysis;
    }

    function getPieChartData(feedbacks){
      var pie_chart_data = [];
      _.each(feedbacks,  function(value, index){
        pie_chart_data.push({"category": value.option__text, "column-1": value.count, "color": Global.questionnaireDonutColors(index)});
      });
      return pie_chart_data;
    }
  });

})();