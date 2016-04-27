describe('OverallRatingCtrl', function(){
  
  var $rootScope, $httpBackend, controller, flashService, mockResponse;
  var apiLink = 'https://apiarbisoft.sentimeter.io/api/overall_rating?option=';
  var apiSegmentationLink = 'https://apiarbisoft.sentimeter.io/api/feedback_segmentation?date_to=21-04-16&option=8';

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
                "option__text": "Workplace",
                "option_id": 8
              },
              {
                "count": 0,
                "option__color_code": "#ffd200",
                "option__parent_id": null,
                "option__score": 0,
                "option__text": "Culture",
                "option_id": 7
              },
              {
                "count": 0,
                "option__color_code": "#1f9aec",
                "option__parent_id": null,
                "option__score": 0,
                "option__text": "Food",
                "option_id": 6
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
            "option__text": "Cleanliness",
            "option_id": 9,
            "segment_list":[
              {
                "option_count": 0,
                "segment": "Late Night",
                "segment_end_time" : "01:00"
              },
              {
                "option_count": 0,
                "segment": "Morning",
                "segment_end_time" : "06:00"
              },
              {
                "option_count": 0,
                "segment": "Afternoon",
                "segment_end_time" : "10:00"
              },
              {
                "option_count": 0,
                "segment": "Evening",
                "segment_end_time" : "14:00"
              },
              {
                "option_count": 0,
                "segment": "Night",
                "segment_end_time" : "18:00"
              }
            ]
          }
        ]
      }
    };

    option_object = {
      "item" : {
        "category": "21-04-16",
        "dataContext": {
          "category": "21-04-16",
          "column-1": 40,
          "column-1-id": 8,
          "column-2": 29,
          "column-2-id": 7,
          "column-3": 18,
          "column-3-id": 6
        }
      },
      "graph": {
        "id": "column-1-id"
      }
    };

    timelinedata = {
      "labels": [
        {
          "color": "#cb1e24",
          "column": "column-1",
          "value": "Workplace"
        }
      ]
    };

    labels = [
      {
        "color": "#4CCC72",
        "id": "column-1-id",
        "lineColor": "#4CCC72",
        "option_name": "Cleanliness",
        "parent_id": "",
        "title": "Cleanliness",
        "valueField" : "column-1"
      }
    ];

    data = [
      {
        "category": "Late Night",
        "column-1": 0,
        "column-2": 0,
        "column-3": 0
      }
    ];

    graph_output = [
      [
        {
          option_id: 8,
          option_name: 'Workplace',
          parent_id: null,
          color: '#cb1e24',
          lineColor: '#cb1e24',
          title: 'Workplace',
          id: 'column-1-id',
          valueField: 'column-1'
        },
        {
          option_id: 7,
          option_name: 'Culture',
          parent_id: null,
          color: '#ffd200',
          lineColor: '#ffd200',
          title: 'Culture',
          id: 'column-2-id',
          valueField: 'column-2'
        },
        {
          option_id: 6,
          option_name: 'Food',
          parent_id: null,
          color: '#1f9aec',
          lineColor: '#1f9aec',
          title: 'Food',
          id: 'column-3-id',
          valueField: 'column-3'
        }
      ],
      [
        {
          "category": '02-04-16',
          "column-1": 0,
          "column-1-id": 8,
          "column-2": 0,
          "column-2-id": 7,
          "column-3": 0,
          "column-3-id": 6
        }
      ]
    ];

    optionGraph_output = [
      [
        {
          color: '#4CCC72',
          id: 'column-1-id',
          lineColor: '#4CCC72',
          option_name: 'Cleanliness',
          parent_id: '',
          title: 'Cleanliness',
          valueField: 'column-1'
        }
      ],
      [
        {
          "category": 'Late Night',
          "column-1": 0,
          "column-2": 0,
          "column-3": 0
        }
      ]
    ];

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
      expect($rootScope.date.startDate._d.getDate()).toBe(new Date().getUTCDate()-6);
      expect($rootScope.date.endDate._d.getDate()).toBe(new Date().getUTCDate());
    });

  });

  describe('mainRating method', function(){

    it('init scope arrays when api call succeeds', function(){
      $rootScope.mainRating();

      $httpBackend.whenGET(apiLink).respond(mockResponse);
      $httpBackend.flush();

      expect($rootScope.data_array[0][0].date).toEqual("2016-04-02");
      expect($rootScope.overall_rating_data[0][0].option_name).toEqual("Workplace");

    });

    it('shows flash when api call fails', function(){
      $rootScope.mainRating();
      mockResponse.success = false;

      spyOn(flashService, 'createFlash');
      $httpBackend.whenGET(apiLink).respond(mockResponse);
      $httpBackend.flush();

      expect(flashService.createFlash).toHaveBeenCalled();
    });

  });

  describe('optionClick method', function(){

    it('init scope and controller arrays when api call succeeds', function(){
      $rootScope.optionClick(option_object);

      $httpBackend.whenGET(apiSegmentationLink).respond(httpResponse);
      $httpBackend.flush();

      expect(controller.qsc_sub_options_data.data[0].category).toEqual("Late Night");
      expect(controller.qsc_sub_options_data.labels[0]).toEqual("Late Night");
      expect($rootScope.labels[0].title).toEqual("Cleanliness");
      expect($rootScope.overall_rating_data[0][0].option_name).toEqual("Cleanliness");
    });

    it('shows flash when api call fails', function(){
      $rootScope.optionClick(option_object);
      httpResponse.success = false;

      spyOn(flashService, 'createFlash');
      $httpBackend.whenGET(apiSegmentationLink).respond(httpResponse);
      $httpBackend.flush();

      expect(flashService.createFlash).toHaveBeenCalled();
    });

    it('init option object', function(){
      $rootScope.optionClick(option_object);
      expect($rootScope.option_object.item.category).toBe("21-04-16");
    });

  });

  describe('calculateDataSets method', function(){

    it('returns data sets of api response', function(){
      expect(controller.calculate_data_sets(mockResponse,7)).toEqual([mockResponse.response]);
    });

    it('sets max pages',function(){
      controller.calculate_data_sets(mockResponse,7);
      expect($rootScope.max_page).toBe(1);
    });

  });

  describe('getLabelColor method', function(){

    it('returns label color', function(){
      expect(controller.getLabelColor(timelinedata, mockResponse.response[0].data.feedbacks[0])).toEqual({value: 'Workplace', color: '#cb1e24', column: 'column-1'});
    });

  });

  describe('drawGraph method', function(){

    it('returns an array to draw graph', function(){
      expect(controller.drawGraph(mockResponse.response, mockResponse.response[0].data.feedbacks)).toEqual(graph_output);
    });

  });

  describe('drawOptionGraph method', function(){

    it('returns an array to draw option graph', function(){
      expect(controller.drawOptionGraph(data,labels)).toEqual(optionGraph_output);
    });

  });

  describe('backToMain method', function(){

    it('returns to main view', function(){
      spyOn($rootScope, 'mainRating');
      $rootScope.backToMain();
      expect($rootScope.mainRating).toHaveBeenCalled();

    });

  });

});