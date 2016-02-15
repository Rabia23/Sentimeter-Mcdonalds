(function() {
  angular.module( 'livefeed.login')

  .config(function config( $stateProvider ) {
    $stateProvider
    .state( 'login', {
      url: '/login',
      views: {
        "": {
          controller: 'LoginCtrl',
          templateUrl: 'login/login.tpl.html'
        }
      },
      authenticate: false
    });
  });
})();