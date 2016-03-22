(function() {
  angular.module('livefeed')

  .service('APIInterceptor', function( $injector) {
    return {
      'request': function(config){
        return config;
      },
      'responseError' : function(response){
        if (response.status === 500) {
          $injector.get('$state').go('error_500');
        }
        return response;
      },
      'response': function(response) {
        return response;
      }
    };
  });

})();
