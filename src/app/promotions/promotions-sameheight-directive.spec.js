describe('promotionSameHeight', function(){

  var $element, $scope;
  
  beforeEach(module('livefeed.promotions'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {
    
    $scope = _$rootScope_;
    $scope.promotion = 'foo';
    $element = _$compile_("<div promotion-same-height data-promotion = 'promotion'> </div")(_$rootScope_); 
  
  }));

  it('should apply same height', function(){

    spyOn(window, 'initSameHeight');
    $element.scope().$apply();
    expect(window.initSameHeight).toHaveBeenCalled();
  });


});