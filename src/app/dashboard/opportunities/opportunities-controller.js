(function() {
  angular.module('livefeed.dashboard.opportunities')

  .controller( 'OpportunitiesCtrl', function OpportunitiesCtrl( $scope, Graphs, flashService ) {
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
            colour: data.option__color_code
          };
        });
      }
      else{
        flashService.createFlash(opportunity_data.message, "danger");
      }
    });
  });
})();