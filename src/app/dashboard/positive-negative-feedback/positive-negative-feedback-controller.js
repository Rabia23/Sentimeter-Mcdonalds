(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .controller( 'PositiveNegativeFeedbackCtrl', function PositiveNegativeFeedbackCtrl( $scope, _, Global, Graphs,$uibModal, $log, commentService, flashService ) {

    $scope.show_error_message = false;

    $scope.getComments = function() {

      Graphs.comments(1).$promise.then(function(data){
        if(data.success) {
          $scope.show_error_message = false;
          $scope.feedback_count = data.response.feedback_count;
          $scope.comments = _.map(data.response.feedbacks, function (data) {
            return commentService.getComment(data);
          });
        }
        else{
          $scope.show_error_message = true;
          $scope.error_message = data.message;
          flashService.createFlash($scope.error_message, "danger");
        }
      });
    };

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        templateUrl: 'dashboard/positive-negative-feedback/comments-modal.tpl.html',
        controller: 'ModalInstanceCtrl',
        size: 1200,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };
  });
})();