(function() {
    angular.module('livefeed')
    .controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope, offlineService ) {
      $rootScope.show_username = false;

      $rootScope.main = {
        brand: "LiveFeed"
      };

      //console.log("Offline service: "+offlineService.init());
    })
    .service('APIInterceptor', function($rootScope) {
      return {
        'request': function(config){
          return config;
        },
        'responseError' : function(response){
          if (response.status === 500) {
            $rootScope.$broadcast('unauthorized');
          }
          return response;
        },
        'response': function(response) {
          return response;
        }
      };
    });
})();