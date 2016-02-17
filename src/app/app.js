angular.module( 'livefeed', [
  'templates-app',
  'templates-common',
  'livefeed.dashboard',
  'livefeed.login',
  'livefeed.how_to',
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

.run( function run ($rootScope, Auth, $state, TokenHandler, flashService, $timeout) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    flashService.dismissFlash();
    $rootScope.show_alert = false;
    $timeout(function(){
      $rootScope.show_alert = true;
    }, 5000);
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

  $rootScope.logout = function(){
    Auth.is_logged_out();
    $rootScope.fullname = null;
    $state.go('login');
  };

  $rootScope.onAlertDismiss = function(flash){
    flashService.dismissFlash();
  };

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope, offlineService ) {
  $rootScope.show_username = false;

  $rootScope.main = {
    brand: "LiveFeed"
  };

  //console.log("Offline service: "+offlineService.init());
})

.factory('flashService', function(Flash, $rootScope, $timeout){
  var flashId;
  return {
    createFlash: function(message, type){
      $timeout(function(){
        if(flashId !== undefined){
          Flash.dismiss(flashId);
        }
        flashId = Flash.create(type, message, 5000, {class: 'custom-class'}, true);
      });
    },
    dismissFlash: function(){
      console.log("in the dissmiss flash");
      $timeout(function(){
        if(flashId){
          console.log("in the if");
          console.log(flashId);
          Flash.dismiss(flashId);
          flashId = undefined;
        }
      });
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
