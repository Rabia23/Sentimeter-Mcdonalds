(function() {
  angular.module('livefeed.dashboard.category_performance_analysis')

  .controller('CategoryModalCtrl', function ($scope, $uibModalInstance, flashService) {

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();