(function() {
  angular.module('livefeed.dashboard.age_group_analysis')

  .controller( 'AgeAnalysisCtrl', function ( $scope, Graphs, mapService, flashService ) {

    $scope.today = new Date();

    $scope.show_error_message = false;

    function resetDates(){
      $scope.date = {
          startDate: moment().subtract(1, "days"),
          endDate: moment()
      };
    }

    resetDates();

    //$scope.show_loading = true;


    function draw_age_analysis(start_date,end_date ){

    }

    $scope.datePickerOption = {
      eventHandlers: {
        'apply.daterangepicker': function(ev, picker){

          $scope.show_loading = true;
          draw_age_analysis(ev.model.startDate._i, ev.model.endDate._i);
        },
        'cancel.daterangepicker': function(ev, picker){
          //$scope.datePicker.date.startDate = null;
          //$scope.datePicker.date.endDate = null;
        }

      },
      opens: "left"
    };


    draw_age_analysis();
  });
})();