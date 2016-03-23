(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .controller('ViewCommentModalCtrl', function ($scope, $uibModalInstance) {
    $scope.show_loading = false;
    $scope.comment = "Hi...!";

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();