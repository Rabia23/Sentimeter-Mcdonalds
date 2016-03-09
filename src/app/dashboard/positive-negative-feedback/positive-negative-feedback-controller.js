(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .controller( 'PositiveNegativeFeedbackCtrl', function PositiveNegativeFeedbackCtrl( $scope, _, Global, Graphs,$uibModal, $log, commentService, flashService, StatusEnum ) {

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
    $scope.$on('handleBroadcast', function(event, args) {
      $scope.open(args.text);
    });
    
    $scope.open = function (text) {
      var modalInstance = $uibModal.open({
        templateUrl: 'dashboard/positive-negative-feedback/comments-modal.tpl.html',
        controller: 'ModalInstanceCtrl',
        size: 1200,
        resolve: {
          text: function () {
            return text;
          }
        }
      });
    };
  });
})();