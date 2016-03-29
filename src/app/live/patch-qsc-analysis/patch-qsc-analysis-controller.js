(function() {

  angular.module( 'livefeed.live.patch_qsc_analysis')

  .controller( 'PatchQscAnalysisCtrl', function PatchQscAnalysisController( $scope, Global, $rootScope, ComplaintStatusEnum ) {

    function region_data(action_analysis_data){
      var complaints = {};
      _.each(action_analysis_data, function(action){
        complaints[Global.complaintAnalysisAction[action.action_taken][0]] = action.count;
      });
      return complaints;
    }

    function patch_qsc_analysis() {
      var complaints = null;
      var pakistan_feedback_count = 0;
      $scope.pakistan_analysis = [];
      $scope.north_analysis = [];
      $scope.south_analysis = [];
      $scope.north_south_percentage = [];
      $scope.patch_qsc_labels = [];

      $scope.all_zeros = false;

      _.each($scope.complaint_view, function(data){
        var count = 0;
        _.each(data.data.action_analysis,  function(dat) {
          if( dat.action_taken === ComplaintStatusEnum.get_skip_label_index() ){
            count = count + dat.count;
          }
        });
        data.data.feedback_count = data.data.feedback_count - count;
      });
      _.map($scope.complaint_view, function(data){
        data.data.action_analysis = _.filter(data.data.action_analysis,  function(dat) { return dat.action_taken !== ComplaintStatusEnum.get_skip_label_index(); });
      });

      _.each($scope.complaint_view[0].data.action_analysis, function (value) {
        $scope.patch_qsc_labels.push({action_name: Global.complaintAnalysisAction[value.action_taken][0], action_class: Global.complaintAnalysisActionClass[value.action_taken]});
      });
      $scope.patch_qsc_labels = _.sortBy($scope.patch_qsc_labels, function (value) { return Global.complaintAnalysisActionPriority[value.action_name];});

      if($scope.complaint_view[0].data.feedback_count === 0){
        $scope.all_zeros = true;
      }

      _.each($scope.complaint_view, function (value) {
        var region_name = value.object.name;
        if(region_name === "Pakistan") {
          pakistan_feedback_count = value.data.feedback_count;
          _.each(value.data.action_analysis,function(dat){
            $scope.pakistan_analysis.push({ "category": Global.complaintAnalysisAction[dat.action_taken][0], "column-1": dat.count, "color": Global.complaintAnalysisAction[dat.action_taken][1] });
          });
        }
        else if(region_name === "South") {
          complaints = region_data(value.data.action_analysis);
          $scope.south_analysis.push({ "category": region_name.toUpperCase(), "column-1": complaints.Unprocessed, "column-2": complaints.Unrecoverable, "column-3": complaints.Recovered });
          $scope.north_south_percentage.push({ "category": region_name.toUpperCase(), "column-1": Math.round((value.data.feedback_count / pakistan_feedback_count) * 100), "color": "#ff0f00" });
        }
        else if(region_name === "North") {
          complaints = region_data(value.data.action_analysis);
          $scope.north_analysis.push({ "category": region_name.toUpperCase(), "column-1": complaints.Unprocessed, "column-2": complaints.Unrecoverable, "column-3": complaints.Recovered });
          $scope.north_south_percentage.push({ "category": region_name.toUpperCase(), "column-1": Math.round((value.data.feedback_count / pakistan_feedback_count) * 100), "color":"#ff6600" });
        }
      });
      $scope.north_south_percentage = _.sortBy($scope.north_south_percentage, function (value) { return value.category; });
    }

    $rootScope.$on('live-data-received', function (event, data) {
      patch_qsc_analysis();
    });

  });


})();
