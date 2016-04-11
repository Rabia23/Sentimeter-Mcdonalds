describe('OpportunitiesCtrl', function(){
  
  var $rootScope, $httpBackend, controller, flashService;
  var apilink = 'https://stagingapimcdonalds.sentimeter.io/api/opportunity_analysis?branch=&city=&date_from=&date_to=&region=';
  
  beforeEach(module('livefeed.dashboard.opportunities'));
  beforeEach(module('livefeed'));

  beforeEach(inject(function(_$httpBackend_,_$rootScope_, _$controller_, _flashService_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    flashService = _flashService_;
    controller =  _$controller_("OpportunitiesCtrl", {$scope: $rootScope});
    window.ga = function(){};
  }));

  it('success with data init $scope.data', function(){
    $httpBackend.whenGET(apilink)
    .respond(
      {
        success: true,
        response: {
          "feedback_count": 46,
          "feedbacks": [
            {
              "option__parent_id": null,
              "option__color_code": null,
              "option__score": 0,
              "option__text": "Quality of Food",
              "option_id": 37,
              "count": 10
            }
          ]
        }
        
      }
    );

    $httpBackend.flush();
    expect($rootScope.opportunity_data[0].name).toEqual("Quality of Food");
  });

  it('show flash when api request failure', function(){
    
    spyOn(flashService, 'createFlash');
    
    $httpBackend.whenGET(apilink)
    .respond(
      {
        success: false
        
      }
    );

    $httpBackend.flush();
    expect(flashService.createFlash).toHaveBeenCalled();
  });



});