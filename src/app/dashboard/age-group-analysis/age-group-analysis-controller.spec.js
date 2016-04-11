describe('AgeAnalysisCtrl', function(){

  var $rootScope, GenderColors, AgeAnalysisApi, httpResponse, flashService;
  var apiLink = 'https://stagingapimcdonalds.sentimeter.io/api/customer_analysis?branch=&city=&date_from=&date_to=&region=';

  beforeEach(module('livefeed.dashboard.age_group_analysis'));
  beforeEach(module('livefeed'));

  beforeEach(inject(function(_AgeAnalysisApi_, _$rootScope_, $controller, _GenderColors_, _$httpBackend_, _flashService_) {

    $rootScope = _$rootScope_;
    GenderColors = _GenderColors_;
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
                "gender_group_label": "MALE"
              },
              {
                "count": 2,
                "gender_group_id": 1,
                "gender_group_label": "FEMALE"
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


  describe('get male and female colors', function(){

    it('sets the male color', function(){
      var male_color = GenderColors.get_male_color();
      expect($rootScope.men_color).toBe(male_color);
    });

    it('sets the female color', function(){
      var female_color = GenderColors.get_female_color();
      expect($rootScope.female_color).toBe(female_color);
    });

  });

  describe('drawAgeAnalysis method', function(){
    it('init scope array when api call succeeds', function(){
      controller.draw_age_analysis();

      $httpBackend.whenGET(apiLink).respond(httpResponse);
      $httpBackend.flush();

      expect($rootScope.customer_analysis_data[0]["category"]).toEqual("Below 18");

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
