(function() {
  angular.module('livefeed.dashboard.recommendation_likeness')

  .controller( 'RecommendationLikenessCtrl', function ( $scope, Graphs, mapService, flashService, RecommendationLikenessApi, calculateAverageService, AverageBarColors) {

    $scope.today = new Date();
    $scope.show_loading = true;

    var start_date = null;
    var end_date = null;

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
        },
        'cancel.daterangepicker': function(ev, picker){
        }

      },
      opens: "left"
    };

    function getAverageBarColor(){
      $scope.bar_color = null;
      if($scope.total_average <= 25){
        $scope.bar_color = AverageBarColors.get_bar_color(0);
      }
      else if($scope.total_average <= 50){
        $scope.bar_color = AverageBarColors.get_bar_color(1);
      }
      else if($scope.total_average <= 75){
        $scope.bar_color = AverageBarColors.get_bar_color(2);
      }
      else{
        $scope.bar_color = AverageBarColors.get_bar_color(3);
      }
    }

    function draw_recommendation_likeness(region_id, city_id, branch_id){
      RecommendationLikenessApi.recommendation_analysis(region_id, city_id, branch_id, start_date, end_date).$promise.then(function (data) {
        $scope.feedback_count = 0;
        $scope.show_loading = false;
        $scope.recommendation_likeness_data = [];
        if(data.success) {
          $scope.feedback_count = data.response.feedback_count;
          $scope.total_average = 0;

          _.each(data.response.feedbacks, function(data){
            $scope.recommendation_likeness_data.push({"category": data.option__text,"column-1": data.count, "color": data.option__color_code});
          });

          $scope.recommendation_likeness_data = _.sortBy($scope.recommendation_likeness_data, function(item){ return parseInt(item.category, 10); });
          $scope.total_average = calculateAverageService.getAverage(data.response.feedbacks, data.response.feedback_count);
          getAverageBarColor();
        }
        else{
          flashService.createFlash(data.message, "danger");
        }
      });

    }
    resetDates();
    draw_recommendation_likeness();
  });
})();