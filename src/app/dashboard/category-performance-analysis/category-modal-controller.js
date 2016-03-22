(function() {
  angular.module('livefeed.dashboard.category_performance_analysis')

  .controller('CategoryModalCtrl', function ($scope, $timeout, $uibModalInstance, feedbackService, CategoryPerformanceApi, flashService, option_id, string, start_date, end_date) {

    $scope.show_loading = true;

    CategoryPerformanceApi.category_performance("","","",option_id, start_date, end_date).$promise.then(function(performance_data){
      if(performance_data.success) {
        $scope.total_feedback_count = performance_data.response.feedback_count;
        $scope.category_data = _.map(performance_data.response.feedbacks, function (data) {
          return feedbackService.getCategoryFeedbacks(data, performance_data.response.feedback_count, option_id, string);
        });
        $scope.category_data = _.sortBy($scope.category_data, function (value) {
          return value.priority;
        });
      }
      else{
        flashService.createFlash(performance_data.message, "danger");
      }
    });

    CategoryPerformanceApi.segmentation_rating("","","",option_id, start_date, end_date).$promise.then(function (segment_data) {
      if(segment_data.success) {
        $timeout(function () {
          $scope.segments = [];
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