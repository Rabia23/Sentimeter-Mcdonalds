(function() {
  angular.module('livefeed')
  .controller( 'AppCtrl', function AppCtrl ( $rootScope ) {
    $rootScope.show_username = false;

    $rootScope.main = {
      brand: "LiveFeed"
    };

  });
})();
