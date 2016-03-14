(function() {
  angular.module( 'livefeed.error_404')

  .config(function config( $stateProvider ) {
    $stateProvider
    .state( '404', {
      url: '/404',
      views: {
        "": {
          templateUrl: 'error-404/error-404.tpl.html'
        }
      },
      authenticate: false
    });
  });
})();