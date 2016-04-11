(function() {
  angular.module('livefeed.dashboard.recommendation_likeness')

  .controller( 'RecommendationLikenessCtrl', function ( $scope, flashService, RecommendationLikenessApi, calculateAverageService, AverageBarColors) {

    $scope.today = new Date();
    $scope.show_loading = true;

    var start_date = null;
    var end_date = null;

    var vm = this;
    vm.resetDates = resetDates;
    vm.draw_recommendation_likeness = draw_recommendation_likeness;
    vm.getAverageBarColor = getAverageBarColor;

    vm.resetDates();
    vm.draw_recommendation_likeness();

    function resetDates(){
      $scope.date = {
          startDate: moment().subtract(1, "days"),
          endDate: moment()
      };
    }

    $scope.datePickerOption = {
      eventHandlers: {
        'apply.daterangepicker': function(ev, picker){

          $scope.show_loading = true;
          start_date = ev.model.startDate._i;
          end_date =  ev.model.endDate._i;
          draw_recommendation_likeness();
        }
      },
      opens: "left"
    };

    function getAverageBarColor(total_average){
      var bar_color = null;
      if(total_average <= 25){
        bar_color = AverageBarColors.get_bar_color(0);
      }
      else if(total_average <= 50){
        bar_color = AverageBarColors.get_bar_color(1);
      }
      else if(total_average <= 75){
        bar_color = AverageBarColors.get_bar_color(2);
      }
      else{
        bar_color = AverageBarColors.get_bar_color(3);
      }
      return bar_color;
    }

    function draw_recommendation_likeness(region_id, city_id, branch_id){
      RecommendationLikenessApi.recommendation_analysis(region_id, city_id, branch_id, start_date, end_date).$promise.then(function (data) {
        $scope.feedback_count = 0;
        $scope.show_loading = false;
        if(data.success) {
          $scope.recommendation_likeness_data = [];
          $scope.feedback_count = data.response.feedback_count;
          $scope.total_average = 0;

          _.each(data.response.feedbacks, function(data){
            $scope.recommendation_likeness_data.push({"category": data.option__text,"column-1": data.count, "color": data.option__color_code});
          });

          $scope.recommendation_likeness_data = _.sortBy($scope.recommendation_likeness_data, function(item){ return parseInt(item.category, 10); });
          $scope.total_average = calculateAverageService.getAverage(data.response.feedbacks, data.response.feedback_count);
          $scope.bar_color = getAverageBarColor($scope.total_average);
        }
        else{

          flashService.createFlash(data.message, "danger");
        }
      });

    }

  });
})();