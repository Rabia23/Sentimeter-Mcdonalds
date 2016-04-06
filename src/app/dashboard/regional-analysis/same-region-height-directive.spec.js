describe('regionalRegionSameHeight', function(){

  var $element, $scope;

  beforeEach(module('livefeed.dashboard.regional_analysis'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {

    $scope = _$rootScope_;
    $scope.donut_regions_data = [];
    $element = _$compile_("<div same-region-height data-data='donut_regions_data'> </div>")($scope);

  }));

  it('should apply same height', function(){

    spyOn(window, 'initSameHeight');
    $scope.$digest();
    expect(window.initSameHeight).toHaveBeenCalled();
  });


});