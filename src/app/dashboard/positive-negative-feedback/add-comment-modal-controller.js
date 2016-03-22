(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .controller('AddCommentModalCtrl', function ($scope, $uibModalInstance) {
    console.log("add comment modal controller");
    $scope.show_loading = true;

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();