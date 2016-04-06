describe('regionalCitySameHeight', function(){

  var $element, $scope;

  beforeEach(module('livefeed.dashboard.regional_analysis'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {

    $scope = _$rootScope_;
    $scope.donut_cities_data = [];
    $element = _$compile_("<div same-city-height data-data='donut_cities_data'> </div>")($scope);

  }));

  it('should apply same height', function(){

    spyOn(window, 'initSameHeight');
    $scope.$digest();
    expect(window.initSameHeight).toHaveBeenCalled();
  });


});