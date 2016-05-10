(function() {
  angular.module('livefeed.dashboard.category_performance_analysis')

  .controller('CategoryModalCtrl', function ($scope, $uibModalInstance, performance_response, segment_response, feedbackService, flashService) {

    if(performance_response.success) {
      $scope.category_data = [];
      $scope.total_feedback_count = performance_response.response.feedback_count;
      $scope.category_data = _.map(performance_response.response.feedbacks, function (data) {
        return feedbackService.getCategoryFeedbacks(data, performance_response.response.feedback_count);
      });
    }
    else{
      flashService.createFlash(performance_response.message, "danger");
    }

    if(segment_response.success) {
      $scope.segments = [];
      $scope.segments = _.map(segment_response.response.segments, function (data) {
        return feedbackService.getSegmentFeedbacks(data);
      });
    }
    else{
      flashService.createFlash(segment_response.message, "danger");
    }

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();
