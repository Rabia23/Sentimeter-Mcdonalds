(function() {
  angular.module( 'livefeed.error_500')

  .config(function config( $stateProvider ) {
    $stateProvider
    .state( 'error_500', {
      url: '/500',
      views: {
        "": {
          templateUrl: 'error-500/error-500.tpl.html'
        }
      },
      authenticate: false
    });
  });
})();