describe('PromotionsDetailCtrl', function(){
  
  var $rootScope, $httpBackend, controller, flashService, mockResponse;
  var apilink = 'https://apiarbisoft.sentimeter.io/api/promotion_detail';
  
  beforeEach(module('livefeed.promotions'));
  beforeEach(module('livefeed'));

  beforeEach(inject(function(_$httpBackend_,_$rootScope_, _$controller_, _flashService_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    flashService = _flashService_;
    controller =  _$controller_("PromotionsDetailCtrl", {$scope: $rootScope});
    window.ga = function(){};
    mockResponse = {
      "success": true,
      "response": {
        "promotion": {
          "id": 3,
          "title": "Coffee",
          "isActive": false,
          "objectId": "mzFmUfRACH",
          "toggle_colors": true,
          "color_selected": null,
          "color_unselected": null,
          "banner_image": null,
          "background_image": null
        },
        "analysis": [
          {
            "type": 4,
            "total_count": 0,
            "feedbacks": [
              {
                  "option__parent_id": null,
                  "count": 0,
                  "option__score": 0,
                  "option__text": "No",
                  "option_id": 36,
                  "option__color_code": "#e84c3d"
              },
              {
                  "option__parent_id": null,
                  "count": 0,
                  "option__score": 0,
                  "option__text": "Yes",
                  "option_id": 35,
                  "option__color_code": "#f7ca17"
              }
            ],
            "question": "Are you satisfied with the taste?"
          }
        ]
      
      }
    };

  }));

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

  describe('showPromotionData method', function(){

    it('init scope arrays when api call succeeds', function(){
      controller.showPromotionData();

      $httpBackend.whenGET(apilink).respond(mockResponse);
      $httpBackend.flush();

      expect($rootScope.promotion.title).toEqual("Coffee");
      expect($rootScope.questions[0].question).toEqual("Are you satisfied with the taste?");
    });

    it('shows flash when api call fails', function(){
      controller.showPromotionData();
      mockResponse.success = false;
      spyOn(flashService, 'createFlash');

      $httpBackend.whenGET(apilink).respond(mockResponse);
      $httpBackend.flush();

      expect(flashService.createFlash).toHaveBeenCalled();
    });
  });

  describe('getPieChartData method', function(){
    it('pie chart data', function(){
      expect(controller.getPieChartData(mockResponse.response.analysis[0].feedbacks))
      .toEqual([{category: 'No', 'column-1': 0, color: '#e84c3d'}, {category: 'Yes', 'column-1': 0, color: '#f7ca17'}]);
    });

  });

  describe('getBarChartData method', function(){
    it('bar chart data', function(){
      var output = {category: 'Yes', 'column-1': 0, priority: 1, color: '#f7ca17'};
      var feedbacks =  [
        {
          "option__parent_id": null,
          "count": 0,
          "option__score": 0,
          "option__text": "Billboards",
          "option_id": 28,
          "option__color_code": "#9C59B8"
        },
        {
          "option__parent_id": null,
          "count": 0,
          "option__score": 0,
          "option__text": "Radio",
          "option_id": 27,
          "option__color_code": "#F0C547"
        }
      ];

      expect(controller.getBarChartData(feedbacks, 2)).toEqual([{id: 28, name: 'Billboards', count: 0, percentage: 0, colour: '#9C59B8'}, {id: 27, name: 'Radio', count: 0, percentage: 0, colour: '#F0C547'}]);
    });

  });



});