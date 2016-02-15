(function() {
  angular.module( 'livefeed.live.strength')



  .controller( 'StrengthCtrl', ['$scope', '_','Global','$rootScope', function( $scope, _, Global, $rootScope ) {

    function strength(){
      var strength_list = $scope.strength.feedbacks;
      $scope.strength_data = [];
      _.each(strength_list, function(value, index){
        $scope.strength_data.push({"category": value.option__text, "column-1": value.count, "priority": Global.opportunityPriority[value.option__text]});
      });
      $scope.strength_data = _.sortBy($scope.strength_data, function(value){ return value.priority; });
    }

    $rootScope.$on('live-data-received', function (event, data) {
      strength();
    });
    
  }]);

})();

