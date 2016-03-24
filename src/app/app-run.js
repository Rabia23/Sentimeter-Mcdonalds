(function() {
  angular.module('livefeed')

  .run( function run ($rootScope, Auth, $state, TokenHandler, flashService, $timeout, $window, $location, apiLinks) {


    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      
      if (toState.authenticate && !Auth.is_logged_in()) {
        event.preventDefault();
        $state.go('login');
      }

      if(Auth.is_logged_in() && toState.name === 'login'){
        $state.go('dashboard');
      }

    });

    if (Auth.is_logged_in()) {
      $rootScope.fullname = TokenHandler.get_fullname();
    }

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      $rootScope.currentState = toState.name;
      $window.ga('send', 'pageview', $location.path());
    });

    $rootScope.logout = function(){
      Auth.is_logged_out();
      $rootScope.fullname = null;
      $state.go('login');
    };

    apiLinks.link.analytics();

  });

  

})();