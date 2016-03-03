(function() {
    angular.module('livefeed.dashboard.top_concern')

    .controller( 'TopConcernsCtrl', function TopConcernController( $rootScope, $scope, Graphs, Global, flashService, $uibModal ) {
      $scope.colors = [];
      $scope.labels = [];
      $scope.show_loading = true;

      $scope.show_error_message = false;

      Graphs.top_concerns().$promise.then(function(data){
        if(data.success) {
          $scope.show_error_message = false;
          $scope.data = [];
          $scope.all_zero = true;

          $scope.concern_list = data.response.concern_list;

          _.each($scope.concern_list, function (value, index) {
            if (value.weight > 0) {
              $scope.all_zero = false;
            }
          });

          _.each($scope.concern_list, function (value, index) {
            $scope.data.push({"category": value.name, "column-1": value.weight, "color": Global.topConcernsColors(index)});

          });
          $scope.show_loading = false;
        }
        else{
          $scope.show_error_message = true;
          $scope.error_message = data.message;
          flashService.createFlash($scope.error_message, "danger");
        }
      });

      $scope.getConcernsString = function (text_string) {
        $rootScope.$broadcast('handleBroadcast', {text: text_string});
      };

    });

})();