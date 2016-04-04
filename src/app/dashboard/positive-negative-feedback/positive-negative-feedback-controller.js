(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .controller( 'PositiveNegativeFeedbackCtrl', function PositiveNegativeFeedbackCtrl( $scope, Graphs, $uibModal, commentService, flashService ) {

    $scope.show_loading = false;

    $scope.getComments = function() {
      $scope.show_loading = true;
      Graphs.comments(1).$promise.then(function(data){
        if(data.success) {
          $scope.feedback_count = data.response.feedback_count;
          $scope.comments = _.map(data.response.feedbacks, function (data) {
            return commentService.getComment(data);
          });
          $scope.show_loading = false;
        }
        else{
          flashService.createFlash(data.message, "danger");
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