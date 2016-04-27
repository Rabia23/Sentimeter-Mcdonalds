describe('RecommendationLikenessCtrl', function(){

  var $rootScope, GenderColors, AgeAnalysisApi, httpResponse, flashService;
  var apiLink = 'https://apiarbisoft.sentimeter.io/api/recommendation_analysis?branch=&city=&date_from=&date_to=&region=';

  beforeEach(module('livefeed.dashboard.recommendation_likeness'));
  beforeEach(module('livefeed'));

  beforeEach(inject(function(_$rootScope_, $controller, _$httpBackend_, _flashService_) {

    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    flashService = _flashService_;
    window.ga = function(){};
    controller = $controller('RecommendationLikenessCtrl', { $scope: $rootScope });
    httpResponse = {
      success: true,
      response: {
        "feedback_count": 18,
        "feedbacks": [
          {
            "count": 1,
            "option__color_code": "#0E590A",
            "option__parent_id": null,
            "option__score": 0,
            "option__text": "10",
            "option_id": 97
          },
          {
            "count": 1,
            "option__color_code": "#01ad0f",
            "option__parent_id": null,
            "option__score": 0,
            "option__text": "7",
            "option_id": 94
          }
        ]
      }
    };
  }));

  it('should define controller', function(){
    expect(controller).toBeDefined();
  });

  it('init the datepicker options', function(){
    expect($rootScope.datePickerOption).toBeDefined();
  });

  describe('resetDates method', function(){
    it('reset dates', function(){
      controller.resetDates();
      expect($rootScope.date.startDate._d.getDate()).toBe(new Date().getUTCDate()-1);
      expect($rootScope.date.endDate._d.getDate()).toBe(new Date().getUTCDate());
    });

  });

  describe('drawRecommendationLikeness method', function(){

    it('init scope arrays when api call succeeds', function(){
      controller.draw_recommendation_likeness();

      $httpBackend.whenGET(apiLink).respond(httpResponse);
      $httpBackend.flush();

      expect($rootScope.feedback_count).toBe(18);
      expect($rootScope.recommendation_likeness_data[0]["category"]).toEqual("7");
      expect($rootScope.total_average).toBe(9);
      expect($rootScope.bar_color).toEqual("#ac1a1a");

    });

    it('shows flash when api call fails', function(){
      controller.draw_recommendation_likeness();
      httpResponse.success = false;
      spyOn(flashService, 'createFlash');

      $httpBackend.whenGET(apiLink).respond(httpResponse);
      $httpBackend.flush();

      expect(flashService.createFlash).toHaveBeenCalled();
    });

  });

  describe('getAverageBarColor method', function(){

    it('returns average bar color', function(){
      expect(controller.getAverageBarColor(9)).toEqual("#ac1a1a");
    });

  });

});
