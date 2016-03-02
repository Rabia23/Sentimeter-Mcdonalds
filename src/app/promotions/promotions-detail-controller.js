(function() {
  angular.module( 'livefeed.promotions')


  .controller( 'PromotionsDetailCtrl', function PromotionDetailCtrl( $scope, $state, $rootScope, Global, PromotionsChartTypeEnum, TokenHandler, Auth, flashService, $stateParams, PromotionsApi) {
    var promotionId = $stateParams.promotionId;
    var inc = 1;
    $scope.show_loading = true;
    $scope.all_zero = true;
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

    PromotionsApi.promotion_detail(promotionId).$promise.then(function(data){
      $scope.show_loading = false;
      if(data.success){
        $scope.promotion = data.response.promotion;
        $rootScope.page_heading = $scope.promotion.title + " Promotions";
        $scope.questions = data.response.analysis;
        _.each($scope.questions, function(question){
          if (question.total_count > 0) {
              $scope.all_zero = false;
          }
          if(question.type == PromotionsChartTypeEnum.get_bar_chart_value()){
            var question_bar_chart = getBarChartData(question.feedbacks, question.total_count);
             question["question_bar_chart"] = question_bar_chart;
          }
          else if(question.type == PromotionsChartTypeEnum.get_pie_chart_value()){
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
          colour: Global.promotionBarChartClass[data.option__text][1],
          priority: Global.promotionBarChartClass[data.option__text][0]
        };
      });
      question_analysis = _.sortBy(question_analysis, function (value) { return value.priority;  });
      return question_analysis;
    }

    function getPieChartData(feedbacks){
       var pie_chart_data = [];
       _.each(feedbacks,  function(value){
          pie_chart_data.push({
            "category": value.option__text,
            "column-1": value.count,
            "priority": Global.promotionPieChartPriority[value.option__text],
            "color": Global.promotionPieChartColorScheme[value.option__text]});
       });
       pie_chart_data = _.sortBy(pie_chart_data, function(value){ return value.priority; });
       return pie_chart_data;
    }
  });

})();
