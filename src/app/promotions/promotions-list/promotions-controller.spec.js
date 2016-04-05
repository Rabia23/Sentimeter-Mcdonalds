describe('PromotionsCtrl', function(){
  
  var $state, $rootScope, $httpBackend, controller, flashService;
  var apilink = 'https://stagingapimcdonalds.sentimeter.io/api/';
  
  beforeEach(module('livefeed.promotions'));
  beforeEach(module('livefeed'));
  beforeEach(module('livefeed.promotions.api'));

  beforeEach(inject(function(_$httpBackend_,_$state_, _$rootScope_, _$controller_, _flashService_) {
    $state = _$state_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    flashService = _flashService_;
    controller =  _$controller_("PromotionsCtrl", {$scope: $rootScope});
    window.ga = function(){};
  }));


  it('should change page heading', function(){
    expect($rootScope.page_heading).toBe("Promotions");
  });

  it('init promotions array when api request success', function(){
    $httpBackend.whenGET(apilink + 'promotion')
    .respond(
      {
        success: true,
        response: [{
          id: 1,
          title: "Black Pepper Crispy"
        }]
      }
    );

    $httpBackend.flush();
    expect($rootScope.promotions[0].title).toEqual("Black Pepper Crispy");

  });

  it('show flash when api request failure', function(){

    spyOn(flashService, 'createFlash');
    
    $httpBackend.whenGET(apilink + 'promotion')
    .respond(
      {
        success: false,
        response: [{
          id: 1,
          title: "Black Pepper Crispy"
        }]
      }
    );

    $httpBackend.flush();
    expect(flashService.createFlash).toHaveBeenCalled();

  });


  describe('$scope.detail', function(){
    it('should move app to promotion_detail page', function() {
      spyOn($state, 'go');
      $rootScope.detail(1);
      expect($state.go).toHaveBeenCalledWith('promotions_detail', {promotionId: 1});
    });
  });

});
