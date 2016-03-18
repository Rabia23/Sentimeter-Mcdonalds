(function() {
  angular.module('livefeed.dashboard.age_group_analysis')

  .controller( 'AgeAnalysisCtrl', function ( $scope, Graphs, mapService, flashService, AgeAnalysisApi, GenderColors ) {

    $scope.today = new Date();

    $scope.show_error_message = false;

    function resetDates(){
      $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
      };
    }

    resetDates();

    $scope.show_loading = true;
    $scope.men_color = GenderColors.get_male_color();
    $scope.female_color = GenderColors.get_female_color();


    function draw_age_analysis(start_date,end_date ){
      AgeAnalysisApi.customer_analysis(null, null, null, start_date, end_date).$promise.then(function(data){
        $scope.show_loading = false;
        $scope.customer_analysis_data = [];
        if(data.success) {
          $scope.customer_analysis_data = _.map(data.response.customer_analysis, function(item, index){
            var obj = {"category": item.age_group_label};
            _.each(item.gender_division, function(value, ind){
              if(value.gender_group_label === "MALE"){
                obj["column-1"] = value.count;
              }
              else if(value.gender_group_label === "FEMALE"){
                obj["column-2"] = value.count;
              }
            });
            return obj;
          });
        }
        else{
          flashService.createFlash(data.message, "danger");
        }
      });
    }

    draw_age_analysis();

    $scope.datePickerOption = {
      eventHandlers: {
        'apply.daterangepicker': function(ev, picker){

          $scope.show_loading = true;
          draw_age_analysis(ev.model.startDate._i, ev.model.endDate._i);
        },
        'cancel.daterangepicker': function(ev, picker){
        }

      },
      opens: "left"
    };

  });
})();