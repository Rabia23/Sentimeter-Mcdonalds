describe('AgeAnalysisCtrl', function(){

  var $rootScope, AgeAnalysisApi, httpResponse, flashService;
  var apiLink = 'https://stagingapimcdonalds.sentimeter.io/api/customer_analysis?branch=&city=&date_from=&date_to=&region=';

  beforeEach(module('livefeed.dashboard.age_group_analysis'));
  beforeEach(module('livefeed'));

  beforeEach(inject(function(_AgeAnalysisApi_, _$rootScope_, $controller, _$httpBackend_, _flashService_) {

    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    flashService = _flashService_;
    window.ga = function(){};
    controller = $controller('AgeAnalysisCtrl', { $scope: $rootScope });
    httpResponse = {
      success: true,
      response: {
        "feedback_count": 10,
        "customer_analysis": [
          {
            "age_group_id": 0,
            "age_group_label": "Below 18",
            "count": 4,
            "gender_division":[
              {
                "count": 2,
                "gender_group_id": 0,
                "gender_group_label": "MALE",
                "color_code": "#26AAE2"
              },
              {
                "count": 2,
                "gender_group_id": 1,
                "gender_group_label": "FEMALE",
                "color_code": "#F174AC"
              }
            ]
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

  describe('drawAgeAnalysis method', function(){
    it('init scope array and variables when api call succeeds', function(){
      controller.draw_age_analysis();

      $httpBackend.whenGET(apiLink).respond(httpResponse);
      $httpBackend.flush();

      expect($rootScope.customer_analysis_data[0][0]["category"]).toEqual("Below 18");
      expect($rootScope.men_color).toBe("#26AAE2");
      expect($rootScope.female_color).toBe("#F174AC");

    });

    it('shows flash when api call fails', function(){
      controller.draw_age_analysis();
      httpResponse.success = false;
      spyOn(flashService, 'createFlash');

      $httpBackend.whenGET(apiLink).respond(httpResponse);
      $httpBackend.flush();

      expect(flashService.createFlash).toHaveBeenCalled();
    });

  });

});
