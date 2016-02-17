(function() {
  angular.module( 'livefeed.how_to')

  .controller( 'HowToCtrl', function CouponController( $scope,  _ , $rootScope) {

    $rootScope.$on('app-online', function(event, args) {
      console.log("online in login");
    });

    $rootScope.$on('app-offline', function(event, args) {
      console.log("offline in login");
    });

    $scope.oneAtATime = true;

    $scope.isFirstOpen = false;



  });

})();
