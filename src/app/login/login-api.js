angular.module( 'livefeed.login.api', [
  'ngResource',
  'livefeed.api_links',
  'livefeed.authService'
])

.factory('Authentication', ['$resource','apiLinks', function($resource, apiLinks) {
  function Authentication() {
    this.service = $resource(apiLinks.link.api,{},
    {
      login: {method: "POST",isArray: false, params: {endpoint: "login/"}}
    });
  }

  Authentication.prototype.login = function(authentication){
    return this.service.login({username: authentication.username, password: authentication.password});
  };
  return new Authentication();
}]);
