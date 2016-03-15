(function() {
  angular.module('livefeed')

  .config( function myAppConfig ( $stateProvider, $urlRouterProvider, $httpProvider ) {
    
    $urlRouterProvider.when('', '/login');
    $urlRouterProvider.otherwise( '/404' );

    $httpProvider.interceptors.push('APIInterceptor');
  
  });

})();
