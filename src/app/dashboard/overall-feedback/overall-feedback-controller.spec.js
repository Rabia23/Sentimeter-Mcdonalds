describe('OverallFeedbackCtrl', function(){

  var $rootScope, $httpBackend, controller, flashService, mockResponse;
  var apilink = 'https://stagingapimcdonalds.sentimeter.io/api/overall_feedback';

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
            "option__color_code": null,
            "option__parent_id": null,
            "option__score": 4,
            "option__text": "I'm lovin' it",
            "option_id": 57
          },
          {
            "count": 21,
            "option__color_code": null,
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
      expect($rootScope.date).toBeDefined();
    });

  });

  describe('showGraph method', function(){

    it('init scope arrays when api call succeeds', function(){
      controller.show_graph();

      $httpBackend.whenGET(apilink).respond(mockResponse);
      $httpBackend.flush();

      expect($rootScope.feedback_count).toBeDefined();
      expect($rootScope.show_labels).toBeDefined();
      expect($rootScope.labels).toBeDefined();
      expect(controller.maximum).toBeDefined();
      expect($rootScope.show_canvas).toBeDefined();
      expect($rootScope.bar).toBeDefined();
      expect($rootScope.feedback_count).toBe(48);
      expect($rootScope.show_labels).toBe(true);
      expect($rootScope.labels[0]).toEqual({option_name: "I'm lovin' it", color: '#0E590A'});
      expect($rootScope.show_canvas).toBe(true);
      expect(controller.maximum.count).toBe(21);
      expect($rootScope.bar.labels[0]).toEqual("I'm lovin' it");

    });

    it('shows flash when api call fails', function(){
      controller.show_graph();
      mockResponse.success = false;

      spyOn(flashService, 'createFlash');
      $httpBackend.whenGET(apilink).respond(mockResponse);
      $httpBackend.flush();

      expect($rootScope.feedback_count).not.toBeDefined();
      expect($rootScope.show_labels).toBe(true);
      expect($rootScope.labels).not.toBeDefined();
      expect(controller.maximum).not.toBeDefined();
      expect($rootScope.show_canvas).not.toBeDefined();
      expect($rootScope.bar).not.toBeDefined();

      expect(flashService.createFlash).toHaveBeenCalled();
    });
  });

});