(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .controller('ViewCommentModalCtrl', function ($scope, $uibModalInstance) {
    console.log("view comment modal controller");
    $scope.show_loading = true;

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();