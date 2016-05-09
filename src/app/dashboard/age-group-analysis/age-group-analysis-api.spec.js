describe('ageGroupAnalysisApi', function(){

  var AgeAnalysisApi, $httpBackend, $rootScope;
  var apilink = 'https://stagingapimcdonalds.sentimeter.io/api/customer_analysis?branch=&city=&date_from=&date_to=&region=';

  beforeEach(module('livefeed.dashboard.age_group_analysis.api'));

  beforeEach(inject(function(_$httpBackend_, _AgeAnalysisApi_, _$rootScope_) {
    $httpBackend = _$httpBackend_;
    AgeAnalysisApi = _AgeAnalysisApi_;
    $rootScope = _$rootScope_;

    mockResponse = {
      "success": true,
      "response": {
        "feedback_count": 78,
        "customer_analysis": [
          {
            "age_group_id": 0,
            "age_group_label": "Below 18",
            "count": 8,
            "gender_division": [
              {
                "color_code": "#26AAE2",
                "count": 5,
                "gender_group_id": 0,
                "gender_group_label": "MALE"
              },
              {
                "color_code": "#F174AC",
                "count": 3,
                "gender_group_id": 1,
                "gender_group_label": "FEMALE"
              }
            ]
          }
        ]
      }
    };

  }));

  describe('#customer_analysis', function(){


    it('should get customers list', function () {

      $httpBackend.expectGET(apilink).respond(mockResponse);
      var result = AgeAnalysisApi.customer_analysis();
      $httpBackend.flush();
      expect(result.response.customer_analysis[0].age_group_label).toEqual('Below 18');
    });
  });


});
