describe('categorySameHeight', function(){

  var $element, $scope;

  beforeEach(module('livefeed.dashboard.category_performance_analysis'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {

    $scope = _$rootScope_;
    $scope.segments = [];
    $element = _$compile_("<div same-segment-height data-data='segments'> </div>")($scope);

  }));

  it('should apply same height', function(){

    spyOn(window, 'initSameHeight');
    $scope.$digest();
    expect(window.initSameHeight).toHaveBeenCalled();
  });


});