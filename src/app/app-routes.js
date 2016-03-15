(function() {
  angular.module('livefeed')

  .config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
    
    $urlRouterProvider.when('', '/login');
    $urlRouterProvider.otherwise( '/404' );
  
  });

})();