(function() {
  angular.module('livefeed')

  .service('APIInterceptor', function( $injector, TokenHandler, Auth) {
    return {
      'request': function(config){
        if(Auth.is_logged_in()){
          config.headers.Authorization = TokenHandler.get_token();
        }
        return config;
      },
      'responseError' : function(response){
        if (response.status === 500) {
          $injector.get('$state').go('error_500');
        }
        return response;
      }
    };
  });

})();
