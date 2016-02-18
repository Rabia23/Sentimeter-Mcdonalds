(function() {
  angular.module( 'livefeed.how_to')

  .controller( 'HowToCtrl', function CouponController( $scope,  _ , $rootScope, $location, anchorSmoothScroll) {

    $rootScope.$on('app-online', function(event, args) {
      console.log("online in login");
    });

    $rootScope.$on('app-offline', function(event, args) {
      console.log("offline in login");
    });

    $scope.gotoElement = function (eID){
      $location.hash('bottom');
      anchorSmoothScroll.scrollTo(eID);
      
    };

  });

})();
