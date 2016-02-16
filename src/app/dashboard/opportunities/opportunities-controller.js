(function() {
  angular.module('livefeed.dashboard.opportunities')

  .controller( 'OpportunitiesCtrl', function OpportunitiesCtrl( $scope, Graphs, Global, flashService ) {
    $scope.start_date = null;
    $scope.end_date = null;
    $scope.show_loading = true;

    $scope.show_error_message = false;

    Graphs.opportunity_analysis("","","",$scope.start_date, $scope.end_date).$promise.then(function(opportunity_data){
      $scope.show_loading = false;
      if(opportunity_data.success) {
        $scope.show_error_message = false;
        $scope.opportunity_data = _.map(opportunity_data.response.feedbacks, function (data, index) {
          return {
            id: data.option_id,
            name: data.option__text,
            complaints: data.count,
            percentage: data.count === 0 ? 0 : Math.round((data.count / opportunity_data.response.feedback_count) * 100),
            colour: Global.topConcernsColors(index),
            priority: Global.opportunityPriority[data.option__text]
          };
        });
        $scope.opportunity_data = _.sortBy($scope.opportunity_data, function (value) {
           return value.priority;
        });
      }
      else{
        $scope.show_error_message = true;
        $scope.error_message = opportunity_data.message;
        flashService.createFlash($scope.error_message, "danger");
      }
    });
  });
})();