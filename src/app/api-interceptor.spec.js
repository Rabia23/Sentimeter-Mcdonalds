describe('API_interceptor_service', function(){

  var $injector, APIInterceptor;

  beforeEach(module('livefeed'));
  beforeEach(module('livefeed.authService'));

  beforeEach(inject(function(_$injector_, _APIInterceptor_) {

    $injector = _$injector_;
    APIInterceptor = _APIInterceptor_;
    window.sessionStorage.setItem('loggedin', 'true');
    window.sessionStorage.setItem('token', "c644639a6b60a8e4afb9709668d790e2058a9fc5");
    config = {
      "headers":{
        "Accept": "text/html"
      },
      "method": "GET"
    };
    response = {
      "status": 500
    };

  }));

  describe('request method', function(){

    it('should add authorization key in config.headers object', function(){
      expect(APIInterceptor.request(config))
      .toEqual({
        "headers":{
          "Accept": "text/html",
          "Authorization": "c644639a6b60a8e4afb9709668d790e2058a9fc5"
        },
        "method": "GET"
      });
    });

  });

  describe('responseError method', function(){

    it('redirect to error_500 page when status is 500', function(){
      spyOn($injector.get('$state'), 'go');
      APIInterceptor.responseError(response);
      expect($injector.get('$state').go).toHaveBeenCalledWith('error_500');
    });

  });

});
