(function() {
    angular.module('livefeed')
    .controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope, offlineService ) {
      $rootScope.show_username = false;

      $rootScope.main = {
        brand: "LiveFeed"
      };

      //console.log("Offline service: "+offlineService.init());
    });
})();