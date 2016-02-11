angular.module( 'livefeed', [
  'templates-app',
  'templates-common',
  'livefeed.dashboard',
  'livefeed.login',
  'livefeed.coupon',
  'livefeed.live',
  'livefeed.manage_users',
  'livefeed.promotions',
  'livefeed.authService',
  'ui.router',
  'livefeed.offline'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/login' );
})

.constant('_',
    window._
)

.run( function run ($rootScope, Auth, $state, TokenHandler, Flash) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (toState.authenticate && !Auth.is_logged_in()) {
      event.preventDefault();
      $state.go('login');
    }

  });

  if (Auth.is_logged_in()) {
    $rootScope.fullname = TokenHandler.get_fullname();
  }

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    $rootScope.currentState = toState.name;
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    Flash.dismiss($rootScope.flashId);
  });

  $rootScope.logout = function(){
    Auth.is_logged_out();
    $rootScope.fullname = null;
    $state.go('login');
  };

  $rootScope.onAlertDismiss = function(flash){
    console.log(flash);
    $rootScope.flashId = undefined;
  };

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope, offlineService ) {
  $rootScope.show_username = false;

  $rootScope.main = {
    brand: "LiveFeed"
  };

  //console.log("Offline service: "+offlineService.init());

})

.factory('flashService', function(Flash, $rootScope){
  return {
    createFlash: function(message, type){
      if( $rootScope.flashId !== undefined){
        Flash.dismiss($rootScope.flashId);
      }
        $rootScope.flashId = Flash.create(type, message, 5000, {class: 'custom-class'}, true);
    }
  };
})

.directive('customForm', function() {
  return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        window.initCustomForms();
      }
  };
})

.directive('toggleMenu', function() {
  return {
      restrict: 'A',
      link: function(scope, ele, attrs) {

        ele.bind("click", function(){
          $("body").toggleClass("mini-navbar");
          window.SmoothlyMenu();
        });
      }
  };
});
