(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .controller('ViewCommentModalCtrl', function ($scope, $uibModalInstance, comment_text) {

    $scope.comment = comment_text;

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();