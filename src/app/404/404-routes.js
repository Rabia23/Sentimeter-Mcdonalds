(function() {
  angular.module( 'livefeed.login')

  .config(function config( $stateProvider ) {
    $stateProvider
    .state( '404', {
      url: '/404',
      views: {
        "": {
          templateUrl: '404/404.tpl.html'
        }
      },
      authenticate: false
    });
  });
})();