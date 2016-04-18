(function() {
  angular.module( 'livefeed.live.strength')

  .controller( 'StrengthCtrl', ['$scope','Global','$rootScope', function( $scope, Global, $rootScope ) {

    var vm = this;
    vm.strength = strength;

    function strength(){
      var strength_list = $scope.strength.feedbacks;
      $scope.strength_data = [];
      $scope.all_zero = true;

      _.each(strength_list, function(value, index){
        if(value.count > 0){
          $scope.all_zero = false;
        }
        $scope.strength_data.push({"category": value.option__text, "column-1": value.count, "priority": Global.opportunityPriority[value.option__text]});
      });
      $scope.strength_data = _.sortBy($scope.strength_data, function(value){ return value.priority; });
    }

    $rootScope.$on('live-data-received', function (event, data) {
      vm.strength();
    });
    
  }]);

})();

