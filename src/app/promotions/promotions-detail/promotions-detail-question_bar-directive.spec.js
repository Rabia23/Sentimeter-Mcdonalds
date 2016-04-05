describe('questionBarBackground', function(){

  var $element, $scope;
  
  beforeEach(module('livefeed.promotions'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {
    
    $scope = _$rootScope_;
    $scope.data = 'foo';
    $scope.color = 'green';
    $element = _$compile_("<div class = 'progress-bar' question-bar-background data-data = 'data' data-color = 'color'> </div")(_$rootScope_); 
  
  }));


  it('should apply same height', function(){

    spyOn(window, 'initSameHeight');
    $element.scope().$apply();
    expect(window.initSameHeight).toHaveBeenCalled();
  });


});
