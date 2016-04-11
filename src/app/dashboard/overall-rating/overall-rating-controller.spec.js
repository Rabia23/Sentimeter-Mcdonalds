describe('OverallRatingCtrl', function(){

  // TODO this file need much refractoring
  
  var $rootScope, $httpBackend, controller, flashService, mockResponse;
  var apiLink = 'https://stagingapimcdonalds.sentimeter.io/api/overall_rating?option=';
  var apiSegmentationLink = 'https://stagingapimcdonalds.sentimeter.io/api/feedback_segmentation?date_to=07-04-16&option=48';

  beforeEach(module('livefeed.dashboard.overall_rating'));
  beforeEach(module('livefeed'));

  beforeEach(inject(function(_$httpBackend_,_$rootScope_,$controller,_flashService_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    flashService = _flashService_;
    controller = $controller('TimeLineCtrl', { $scope: $rootScope });
    window.ga = function(){};
    mockResponse = {
      success: true,
      response: [
        {
          "data":{
            "feedback_count": 0,
            "feedbacks": [
              {
                "count": 0,
                "option__color_code": "#cb1e24",
                "option__parent_id": null,
                "option__score": 0,
                "option__text": "Quality",
                "option_id": 48
              },
              {
                "count": 0,
                "option__color_code": "#ffd200",
                "option__parent_id": null,
                "option__score": 0,
                "option__text": "Service",
                "option_id": 52
              },
              {
                "count": 0,
                "option__color_code": "#1f9aec",
                "option__parent_id": null,
                "option__score": 0,
                "option__text": "Cleanliness",
                "option_id": 42
              }
            ]
          },
          "date": "2016-04-02"
        }
      ]
    };

    httpResponse = {
      success: true,
      response: {
        "option_count": 1,
        "options": [
          {
            "option__color_code" : "#4CCC72",
            "option__text": "Not Fresh",
            "option_id": 49,
            "segment_list":[
              {
                "option_count": 0,
                "segment": "Late Night",
                "segment_end_time" : "01:00"
              },
              {
                "option_count": 0,
                "segment": "Breakfast",
                "segment_end_time" : "06:00"
              },
              {
                "option_count": 0,
                "segment": "Lunch",
                "segment_end_time" : "10:00"
              },
              {
                "option_count": 0,
                "segment": "Snack",
                "segment_end_time" : "14:00"
              },
              {
                "option_count": 0,
                "segment": "Dinner",
                "segment_end_time" : "18:00"
              }
            ]
          }
        ]
      }
    };

    option_object = {
      "item" : {
        "category": "07-04-16",
        "dataContext": {
          "category": "07-04-16",
          "column-1": 40,
          "column-1-id": 48,
          "column-2": 29,
          "column-2-id": 52,
          "column-3": 18,
          "column-3-id": 42
        }
      },
      "graph": {
        "id": "column-1-id"
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
      // TODO the tests says that it resets the dates but you are not resetting it?
      // This shows how careful you are while writting code
      controller.resetDates();
      expect($rootScope.date).toBeDefined();
    });

  });

  describe('mainRating method', function(){

    it('init scope arrays when api call succeeds', function(){
      $rootScope.mainRating();

      expect($rootScope.optionView).toBe(false);
      expect(controller.option_id).toBe(null);
      expect($rootScope.mainView).toBe(true);

      $httpBackend.whenGET(apiLink).respond(mockResponse);
      $httpBackend.flush();

      // TODO make multiple tests for them because how will i know what following tests do

      expect(controller.calculate_data_sets).toBeDefined();
      expect($rootScope.page).toBe(1);
      expect(controller.drawGraph).toBeDefined();

    });

    it('shows flash when api call fails', function(){
      $rootScope.mainRating();
      mockResponse.success = false;

      spyOn(flashService, 'createFlash');
      $httpBackend.whenGET(apiLink).respond(mockResponse);
      $httpBackend.flush();

      expect($rootScope.optionView).toBe(false);
      expect(controller.option_id).toBe(null);
      expect($rootScope.mainView).toBe(true);

      expect(flashService.createFlash).toHaveBeenCalled();
    });

  });

  describe('optionClick method', function(){

    it('init scope arrays when api call succeeds', function(){
      $rootScope.optionClick(option_object);
      expect($rootScope.option_object.item.category).toBe("07-04-16");
      expect(controller.option_id).toBe(48);
      expect(controller.date).toBe("07-04-16");
      expect(controller.option_id).toBeDefined();

      $httpBackend.whenGET(apiSegmentationLink).respond(httpResponse);
      $httpBackend.flush();

      expect($rootScope.mainView).toBe(false);
      expect($rootScope.optionView).toBe(true);
      expect(httpResponse.response.options).toBeDefined();
      expect(controller.qsc_sub_options_data.data[0].category).toEqual("Late Night");
      expect(controller.qsc_sub_options_data.labels[0]).toEqual("Late Night");
      expect($rootScope.labels[0].title).toEqual("Not Fresh");
      expect($rootScope.page).toBe(1);
      expect($rootScope.max_page).toBe(1);
      expect(controller.drawOptionGraph).toBeDefined();
    });

    it('shows flash when api call fails', function(){
      $rootScope.optionClick(option_object);
      httpResponse.success = false;

      spyOn(flashService, 'createFlash');
      $httpBackend.whenGET(apiSegmentationLink).respond(httpResponse);
      $httpBackend.flush();

      expect(controller.qsc_sub_options_data).not.toBeDefined();
      expect($rootScope.labels).not.toBeDefined();

      expect(flashService.createFlash).toHaveBeenCalled();
    });

  });

  describe('calculateDataSets method', function(){

    it('returns data sets of api response', function(){
      controller.calculate_data_sets(mockResponse,7);
      expect($rootScope.data_array).toBeDefined();
      expect(mockResponse.response.length).toBe(1);
      expect($rootScope.data_array[0][0].date).toEqual("2016-04-02");
      expect($rootScope.max_page).toBe(1);
    });

  });

  describe('getLabelColor method', function(){

    it('returns label color', function(){
      var timelinedata = {
        "labels": [
          {
            "color": "#cb1e24",
            "column": "column-1",
            "value": "Quality"
          }
        ]
      };
      expect(controller.getLabelColor(timelinedata, mockResponse.response[0].data.feedbacks[0])).toEqual({value: 'Quality', color: '#cb1e24', column: 'column-1'});

    });

  });

  describe('drawGraph method', function(){

    it('draws timeline graph', function(){
      controller.drawGraph(mockResponse.response, mockResponse.response[0].data.feedbacks);
      expect($rootScope.overall_rating_data).toBeDefined();
      expect(controller.timelinedata.data[0].category).toEqual("02-04-16");
      expect(controller.timelinedata.labels[0].value).toEqual("Quality");
      expect($rootScope.labels[0].title).toEqual("Quality");
      expect($rootScope.overall_rating_data[0][0].title).toEqual("Quality");
      expect($rootScope.overall_rating_data[1][0].category).toEqual("02-04-16");
    });

  });

  describe('drawOptionGraph method', function(){

    it('draws timeline option graph', function(){
      var labels = [{ "color": "#4CCC72", "id": "column-1-id", "lineColor": "#4CCC72", "option_name": "Not Fresh", "parent_id": "", "title": "Not Fresh", "valueField" : "column-1" }];
      var data = [{ "category": "Late Night", "column-1": 0, "column-2": 0, "column-3": 0 }];
      controller.drawOptionGraph(data,labels);
      expect($rootScope.overall_rating_data).toBeDefined();
      expect($rootScope.overall_rating_data[0][0].title).toEqual("Not Fresh");
      expect($rootScope.overall_rating_data[1][0].category).toEqual("Late Night");

    });

  });

  describe('backToMain method', function(){

    it('returns to main view', function(){
      spyOn($rootScope, 'mainRating');
      $rootScope.mainRating();
      expect($rootScope.mainRating).toHaveBeenCalled();

    });

  });

});