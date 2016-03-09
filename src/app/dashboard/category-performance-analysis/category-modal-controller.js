(function() {
  angular.module('livefeed.dashboard.category_performance_analysis')

  .controller('CategoryModalCtrl', function ($scope, $timeout, $uibModalInstance, feedbackService, CategoryPerformanceApi, flashService, option_id, string) {
    console.log("option object");
    console.log(option_id);

    CategoryPerformanceApi.category_performance("","","",option_id, null, null).$promise.then(function(performance_data){
      console.log(performance_data);
      if(performance_data.success) {
        $scope.category_data = _.map(performance_data.response.feedbacks, function (data) {
          return feedbackService.getCategoryFeedbacks(data, performance_data.response.feedback_count, option_id, string);
        });
        $scope.category_data = _.sortBy($scope.category_data, function (value) {
          return value.priority;
        });

        if (option_id == null) {
          $scope.QualityID = $scope.category_data[0].id;
          $scope.ServiceID = $scope.category_data[1].id;
          $scope.CleanlinessID = $scope.category_data[2].id;
        }
      }
      else{
        flashService.createFlash(performance_data.message, "danger");
      }
    });

    CategoryPerformanceApi.segmentation_rating("","","",option_id, null, null).$promise.then(function (segment_data) {
      if(segment_data.success) {
        $timeout(function () {
          $scope.segments = _.map(segment_data.response.segments, function (data) {
            return feedbackService.getSegmentFeedbacks(data, option_id, string);
          });
          $scope.segments = _.sortBy($scope.segments, function (value) {
            return value.priority;
          });
          $scope.show_loading = false;
        }, 500);
      }
      else{
        flashService.createFlash(segment_data.message, "danger");
      }
    });

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();