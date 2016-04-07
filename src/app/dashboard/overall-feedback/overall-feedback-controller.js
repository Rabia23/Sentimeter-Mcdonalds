(function() {
  angular.module('livefeed.dashboard.overall_feedback')

  .controller( 'OverallFeedbackCtrl', function DashboardController( $scope, Graphs, Global, overallFeedbackChartService, flashService ) {

    $scope.show_loading = true;
    $scope.show_labels = true;

    $scope.today = new Date();

    var vm = this;
    vm.resetDates = resetDates;
    vm.show_graph = show_graph;

    vm.resetDates();
    vm.show_graph();

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
            vm.show_graph(ev.model.startDate._i, ev.model.endDate._i);
          }
      },
      opens: "left"
    };

    function show_graph(start_date, end_date){
      Graphs.overall_feedback(start_date, end_date).$promise.then(function(graph_data){
        if(graph_data.success) {
          $scope.feedback_count = graph_data.response.feedback_count;
          $scope.show_labels = graph_data.response.feedback_count === 0 ? false : true;
          $scope.labels = _.map(graph_data.response.feedbacks, function (value) {
            return {option_name: value.option__text, color: Global.mainRatingColorScheme[value.option__text]};
          });
          $scope.show_canvas = graph_data.response.feedback_count === 0 ? false : true;
          vm.maximum = {};
          vm.maximum = _.max(graph_data.response.feedbacks, function (data) {
            return data.count;
          });
          $scope.bar = {};
          $scope.bar = overallFeedbackChartService.getBarChartData(graph_data.response, vm.maximum.count);
          $scope.show_loading = false;
        }
        else {
          flashService.createFlash(graph_data.message, "danger");
        }
      });
    }

  });
})();