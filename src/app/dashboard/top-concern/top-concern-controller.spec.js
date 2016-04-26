describe('TopConcernsCtrl', function(){
  
  var $rootScope, $httpBackend, controller, flashService;
  var apilink = 'https://apiarbisoft.sentimeter.io/api/';
  
  beforeEach(module('livefeed.dashboard.top_concern'));
  beforeEach(module('livefeed'));

  beforeEach(inject(function(_$httpBackend_,_$rootScope_, _$controller_, _flashService_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    flashService = _flashService_;
    controller =  _$controller_("TopConcernsCtrl", {$scope: $rootScope});
    window.ga = function(){};
  }));

  it('success with data init $scope.data', function(){
    $httpBackend.whenGET(apilink + 'top_concerns')
    .respond(
      {
        success: true,
        response: {
          concern_count: 1,
          concern_list: [{
            id: 5,
            name: "Smoking",
            weight: 20,
            color_code: "#cb1e24"
          }]
        }
        
      }
    );

    $httpBackend.flush();
    expect($rootScope.data[0].category).toEqual("Smoking");
  });

  it('show flash when api request fails', function(){

    spyOn(flashService, 'createFlash');
    
    $httpBackend.whenGET(apilink + 'top_concerns')
    .respond(
      {
        success: false
      }
    );

    $httpBackend.flush();
    expect(flashService.createFlash).toHaveBeenCalled();

  });

  describe("$scope.getConcernsString", function() {
    it("should broadcast something", function() {
      spyOn($rootScope, '$broadcast');
      $rootScope.getConcernsString("test");
      expect($rootScope.$broadcast).toHaveBeenCalledWith('handleBroadcast', Object({ text: 'test' }));
    });
  });

});