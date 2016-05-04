describe('positiveNegativeDropDownMenuDirective', function(){

  var $element, $scope, $timeout;

  beforeEach(module('livefeed.dashboard.positive_negative_feedback'));

  beforeEach(inject(function( _$compile_, _$rootScope_, _$timeout_ ) {

    $scope = _$rootScope_;
    $scope.branches = 'foo';
    $timeout = _$timeout_;
    $element = _$compile_("<div drop-menu data-branches='branches'></div")(_$rootScope_);

  }));


  it('should call window.initCustomForms method when button clicked', function(){
    spyOn(window, 'initCustomForms');
    setFixtures('<button id="single-button2"> </button>');
    $element.scope().$apply();
    $('#single-button2').trigger('click');
    $timeout.flush();
    expect(window.initCustomForms).toHaveBeenCalled();
  });




});