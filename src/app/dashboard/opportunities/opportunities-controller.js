(function() {
  angular.module('livefeed.dashboard.opportunities')

  .controller( 'OpportunitiesCtrl', function OpportunitiesCtrl( $scope, Graphs, Global, flashService ) {
    var start_date = null;
    var end_date = null;
    $scope.show_loading = true;

    Graphs.opportunity_analysis("", "", "", start_date, end_date).$promise.then(function(opportunity_data){
      $scope.show_loading = false;
      if(opportunity_data.success) {
        $scope.opportunity_data = _.map(opportunity_data.response.feedbacks, function (data, index) {
          return {
            id: data.option_id,
            name: data.option__text,
            complaints: data.count,
            percentage: data.count === 0 ? 0 : Math.round((data.count / opportunity_data.response.feedback_count) * 100),
            colour: Global.opportunityClass[data.option__text][1],
            priority: Global.opportunityClass[data.option__text][0]
          };
        });
        $scope.opportunity_data = _.sortBy($scope.opportunity_data, function (value) {
          return value.priority;
        });
      }
      else{
        flashService.createFlash(opportunity_data.message, "danger");
      }
    });
  });
})();