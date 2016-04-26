(function() {
  angular.module('livefeed.dashboard.opportunities')

  .controller( 'OpportunitiesCtrl', function OpportunitiesCtrl( $scope, Graphs, flashService ) {

    $scope.today = new Date();
    $scope.show_loading = true;

    var vm = this;
    vm.resetDates = resetDates;
    vm.draw_opportunity_analysis = draw_opportunity_analysis;

    vm.resetDates();
    vm.draw_opportunity_analysis();

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
          vm.draw_opportunity_analysis(ev.model.startDate._i, ev.model.endDate._i);
        }
      },
      opens: "left"
    };

    function draw_opportunity_analysis(start_date, end_date){
      Graphs.opportunity_analysis("", "", "", start_date, end_date).$promise.then(function(opportunity_data){
        $scope.show_loading = false;
        if(opportunity_data.success) {
          $scope.opportunity_data = _.map(opportunity_data.response.feedbacks, function (data, index) {
            return {
              id: data.option_id,
              name: data.option__text,
              people: data.count,
              percentage: data.count === 0 ? 0 : Math.round((data.count / opportunity_data.response.feedback_count) * 100),
              colour: data.option__color_code
            };
          });
        }
        else{
          flashService.createFlash(opportunity_data.message, "danger");
        }
      });
    }
  });
})();
