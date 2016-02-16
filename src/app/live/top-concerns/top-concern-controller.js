(function() {
  angular.module( 'livefeed.live.top_concerns')



  .controller( 'TopConcernCtrl', ['$scope', '_','Global','$rootScope', function( $scope, _, Global, $rootScope ) {
    
    function top_concern(){
      var concern_list = $scope.concerns.concern_list;
      $scope.top_concern_data = [];
      _.each(concern_list, function(value, index){
        if(value.name == "Bun"){
          $scope.top_concern_data.push({"category": value.name.toUpperCase()+" [Burnt, Dry]", "column-1": value.weight});
        }
        else if(value.name == "Menu"){
          $scope.top_concern_data.push({"category": value.name.toUpperCase()+" [Variety, Patty size, Bun size]", "column-1": value.weight});
        }
        else{
          $scope.top_concern_data.push({"category": value.name.toUpperCase(), "column-1": value.weight});
        }
      });
    }

    $rootScope.$on('live-data-received', function (event, data) {
      top_concern();
    });
    
  }]);

})();

