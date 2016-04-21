(function() {
  angular.module('livefeed.dashboard.age_group_analysis')

  .controller( 'AgeAnalysisCtrl', function ( $scope, flashService, AgeAnalysisApi ) {

    $scope.today = new Date();
    $scope.show_loading = true;

    var vm = this;
    vm.resetDates = resetDates;
    vm.draw_age_analysis = draw_age_analysis;

    vm.resetDates();
    vm.draw_age_analysis();


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
          vm.draw_age_analysis(ev.model.startDate._i, ev.model.endDate._i);
        }
      },
      opens: "left"
    };

    function draw_age_analysis(start_date, end_date){
      AgeAnalysisApi.customer_analysis(null, null, null, start_date, end_date).$promise.then(function(data){
        $scope.show_loading = false;
        if(data.success) {
          $scope.customer_analysis_data = [];
          var graph_data = _.map(data.response.customer_analysis, function(item, index){
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

          var graph_labels = _.map(data.response.customer_analysis[0].gender_division, function(value,index){
            var label_obj = {};
            if(value.gender_group_label === "MALE"){
              $scope.men_color = value.color_code;
              label_obj["valueField"] = "column-"+(index+1);
              label_obj["color"] = value.color_code;
              label_obj["title"] = value.gender_group_label;
              label_obj["id"]= "AmGraph-"+(index+1);
              return label_obj;
            }
            else if(value.gender_group_label === "FEMALE"){
              $scope.female_color = value.color_code;
              label_obj["valueField"] = "column-"+(index+1);
              label_obj["color"] = value.color_code;
              label_obj["title"] = value.gender_group_label;
              label_obj["id"]= "AmGraph-"+(index+1);
              return label_obj;
            }
          });
          $scope.customer_analysis_data = [graph_data, graph_labels];
        }
        else{
          flashService.createFlash(data.message, "danger");
        }
      });
    }

  });
})();
