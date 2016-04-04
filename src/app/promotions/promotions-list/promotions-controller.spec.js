describe('PromotionsCtrl', function(){
  
  var $state, $rootScope;
  var apilink = 'https://stagingapimcdonalds.sentimeter.io/api/';
  
  beforeEach(module('livefeed.promotions'));
  beforeEach(module('livefeed'));

  beforeEach(inject(function(_$state_, _$rootScope_, _$controller_) {
    $state = _$state_;
    $rootScope = _$rootScope_;
    
    createController = function() {
      return _$controller_("PromotionsCtrl", {$scope: $rootScope});
    };
    
  }));

  it('should change page heading', function(){
    var controller =  createController();
    expect($rootScope.page_heading).toBe("Promotions");
  });


  describe('$scope.detail', function(){
    it('should move app to promotion_detail page', function() {
      var controller =  createController();
      spyOn($state, 'go');
      $rootScope.detail(1);
      expect($state.go).toHaveBeenCalledWith('promotions_detail', {promotionId: 1});
    });
  });

});
