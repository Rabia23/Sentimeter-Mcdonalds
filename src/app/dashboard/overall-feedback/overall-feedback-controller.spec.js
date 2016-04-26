describe('OverallFeedbackCtrl', function(){

  var $rootScope, $httpBackend, controller, flashService, mockResponse;
  var apilink = 'https://apiarbisoft.sentimeter.io/api/overall_feedback';

  beforeEach(module('livefeed.dashboard.overall_feedback'));
  beforeEach(module('livefeed'));

  beforeEach(inject(function(_$httpBackend_,_$rootScope_,$controller,_flashService_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    flashService = _flashService_;
    controller = $controller('OverallFeedbackCtrl', { $scope: $rootScope });
    window.ga = function(){};
    mockResponse = {
      success: true,
      response: {
        "feedback_count": 48,
        "feedbacks": [
          {
            "count": 3,
            "option__color_code": "#0E590A",
            "option__parent_id": null,
            "option__score": 4,
            "option__text": "I'm lovin' it",
            "option_id": 57
          },
          {
            "count": 21,
            "option__color_code": "#e73a3a",
            "option__parent_id": null,
            "option__score": 2,
            "option__text": "Few concerns",
            "option_id": 59
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

  describe('showGraph method', function(){
    it('init scope arrays and returns maximum count when api call succeeds', function(){
      controller.show_graph();

      $httpBackend.whenGET(apilink).respond(mockResponse);
      $httpBackend.flush();

      expect($rootScope.feedback_count).toBe(48);
      expect($rootScope.labels[0]).toEqual({option_name: "I'm lovin' it", color: '#0E590A'});
      expect(controller.maximum.count).toBe(21);
      expect($rootScope.bar.labels[0]).toEqual("I'm lovin' it");
    });

    it('shows flash when api call fails', function(){
      controller.show_graph();
      mockResponse.success = false;

      spyOn(flashService, 'createFlash');
      $httpBackend.whenGET(apilink).respond(mockResponse);
      $httpBackend.flush();

      expect(flashService.createFlash).toHaveBeenCalled();
    });
  });

});