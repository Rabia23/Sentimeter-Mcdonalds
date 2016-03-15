(function() {
  angular.module('livefeed')

  .config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/404' );
  });

})();