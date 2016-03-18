(function() {
  angular.module('livefeed.dashboard.recommendation_likeness')

  .controller( 'RecommendationLikenessCtrl', function ( $scope, Graphs, mapService, flashService, RecommendationLikenessApi) {

    $scope.today = new Date();

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
          $scope.start_date = ev.model.startDate._i;
          $scope.end_date =  ev.model.endDate._i;

          draw_recommendation_likeness();
        },
        'cancel.daterangepicker': function(ev, picker){
        }

      },
      opens: "left"
    };

    resetDates();

    $scope.start_date = null;
    $scope.end_date = null;


    $scope.show_loading = true;


    function draw_recommendation_likeness(region_id, city_id, branch_id){
      RecommendationLikenessApi.recommendation_analysis(region_id, city_id, branch_id, $scope.start_date, $scope.end_date).$promise.then(function (data) {
        $scope.show_loading = false;
        $scope.recommendation_likeness_data = [];
        $scope.feedback_count = data.response.feedback_count;
        if(data.success) {
          var average = 0;
          $scope.total_average = 0;
          _.each(data.response.feedbacks, function(data){
            average = average + data.count * (data.option__text/10);
            $scope.recommendation_likeness_data.push({"category": data.option__text,"column-1": data.count, "color": data.option__color_code});
          });
          $scope.recommendation_likeness_data = _.sortBy($scope.recommendation_likeness_data, function(item){ return parseInt(item.category, 10); });
          $scope.total_average = Math.round((average * 10)/data.response.feedback_count)*10;
        }
        else{
          flashService.createFlash(data.message, "danger");
        }
      });

    }

    draw_recommendation_likeness();
  });
})();