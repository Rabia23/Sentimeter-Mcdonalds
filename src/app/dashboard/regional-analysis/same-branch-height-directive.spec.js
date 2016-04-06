describe('regionalBranchSameHeight', function(){

  var $element, $scope;

  beforeEach(module('livefeed.dashboard.regional_analysis'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {

    $scope = _$rootScope_;
    $scope.donut_branches_data = [];
    $element = _$compile_("<div same-branch-height data-data='donut_branches_data'> </div>")($scope);

  }));

  it('should apply same height', function(){

    spyOn(window, 'initSameHeight');
    $scope.$digest();
    expect(window.initSameHeight).toHaveBeenCalled();
  });


});