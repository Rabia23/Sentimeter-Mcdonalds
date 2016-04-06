describe('questionSameHeight', function(){

  var $element, $scope;

  beforeEach(module('livefeed.questionnaire'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {

    $scope = _$rootScope_;
    $scope.question = 'foo';
    $element = _$compile_("<div question-same-height data-questionnaire = 'question'> </div>")($scope);

  }));

  it('should apply same height', function(){

    spyOn(window, 'initSameHeight');
    $element.scope().$apply();
    expect(window.initSameHeight).toHaveBeenCalled();
  });


});