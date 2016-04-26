describe('API_interceptor_service', function(){

  var $state, APIInterceptor, $httpBackend;

  beforeEach(module('livefeed'));
  beforeEach(module('livefeed.authService'));

  beforeEach(inject(function(_$state_, _APIInterceptor_, _$httpBackend_) {

    $state = _$state_;
    APIInterceptor = _APIInterceptor_;
    $httpBackend = _$httpBackend_;
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

    it('should place token in http request header', function(){
      var apiLink = 'https://apiarbisoft.sentimeter.io/api/recommendation_analysis?branch=&city=&date_from=&date_to=&region=';
      var token = "c644639a6b60a8e4afb9709668d790e2058a9fc5";
      var httpResponse = {
        success: true,
        response: {
          "feedback_count": 18,
          "feedbacks": [
            { "count": 1, "option__color_code": "#0E590A", "option__parent_id": null, "option__score": 0, "option__text": "10", "option_id": 97 },
            { "count": 1, "option__color_code": "#01ad0f", "option__parent_id": null, "option__score": 0, "option__text": "7", "option_id": 94 }
          ]
        }
      };
      $httpBackend.whenGET(apiLink,function(headers){
        expect(headers.Authorization).toBe(token);
      }).respond(httpResponse);
    });

  });

  describe('responseError method', function(){

    it('redirect to error_500 page when status is 500', function(){
      spyOn($state, 'go');
      APIInterceptor.responseError(response);
      expect($state.go).toHaveBeenCalledWith('error_500');
    });

  });

});
