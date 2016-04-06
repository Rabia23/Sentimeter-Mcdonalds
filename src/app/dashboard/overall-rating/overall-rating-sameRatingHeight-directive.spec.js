describe('ratingSameHeight', function(){

  var $element, $scope;

  beforeEach(module('livefeed.dashboard.overall_rating'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {

    $scope = _$rootScope_;
    $scope.overall_rating_data = [];
    $element = _$compile_("<div same-rating-height data-data='overall_rating_data'> </div>")($scope);

  }));

  it('should apply same height', function(){

    spyOn(window, 'initSameHeight');
    $scope.$digest();
    expect(window.initSameHeight).toHaveBeenCalled();
  });


});