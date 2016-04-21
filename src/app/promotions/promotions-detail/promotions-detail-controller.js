(function() {
  angular.module( 'livefeed.promotions')


  .controller( 'PromotionsDetailCtrl', function PromotionDetailCtrl( $scope, $rootScope, PromotionsChartTypeEnum, flashService, $stateParams, PromotionsApi) {
    var promotionId = $stateParams.promotionId;
    var inc = 1;
    $scope.show_loading = true;
    $scope.show_loader = false;
    $scope.all_zero = true;
    $scope.today = new Date();
    var start_date = null;
    var end_date = null;


    var vm = this;
    vm.resetDates = resetDates;
    vm.showPromotionData = showPromotionData;
    vm.getBarChartData = getBarChartData;
    vm.getPieChartData = getPieChartData;

    vm.resetDates();
    vm.showPromotionData();

    $scope.datePickerOption = {
      eventHandlers: {
        'apply.daterangepicker': function(ev, picker){
          $scope.show_loader  = true;
          $scope.all_zero = true;
          start_date = ev.model.startDate._i;
          end_date =  ev.model.endDate._i;
          showPromotionData();
        }
      },
      opens: "left"
    };

    function resetDates(){
      $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
      };
    }

    function showPromotionData() {

      PromotionsApi.promotion_detail(promotionId, start_date, end_date).$promise.then(function(data){
        $scope.show_loading = false;
        $scope.show_loader  = false;
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
    }

    function getBarChartData(feedbacks, feedback_count){
      var question_analysis = _.map(feedbacks,  function(data, index){
        return {
          id: data.option_id,
          name: data.option__text,
          count: data.count,
          percentage: data.count === 0 ? 0 : Math.round((data.count/feedback_count)*100),
          colour: data.option__color_code
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
          "color": value.option__color_code
        });
      });
      return pie_chart_data;
    }

    
  });

})();
