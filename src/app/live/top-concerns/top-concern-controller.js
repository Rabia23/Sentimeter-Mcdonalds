(function() {
  angular.module( 'livefeed.live.top_concerns')

  .controller( 'TopConcernCtrl', ['$scope', '$rootScope', function( $scope, $rootScope ) {

    var vm = this;
    vm.top_concern = top_concern;
    
    function top_concern(){
      var concern_list = $scope.concerns.concern_list;
      $scope.all_zero = true;
      $scope.top_concern_data = [];
      _.each(concern_list, function(value, index){
        if(value.weight > 0){
          $scope.all_zero = false;
        }
        $scope.top_concern_data.push({"category": value.name.toUpperCase(), "column-1": value.weight});
      });
    }

    $rootScope.$on('live-data-received', function (event, data) {
      vm.top_concern();
    });
    
  }]);

})();

