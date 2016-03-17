(function() {
  angular.module('livefeed')

  .service('APIInterceptor', function($rootScope) {
    return {
      'request': function(config){
        return config;
      },
      'responseError' : function(response){
        if (response.status === 500) {
          $rootScope.$broadcast('unauthorized');
        }
        return response;
      },
      'response': function(response) {
        return response;
      }
    };
  });

})();
