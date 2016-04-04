describe('questionBarBackground', function(){

  var $element, $scope;
  
  beforeEach(module('livefeed.promotions'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {
    
    $scope = _$rootScope_;
    $scope.data = 'foo';
    $scope.color = 'green';
    $element = _$compile_("<div class = 'progress-bar' question-bar-background data-data = 'data' data-color = 'color'> </div")(_$rootScope_); 
  
  }));

  // it('should apply inline stylings', function(){

  //   $element.scope().$apply();
  //   $scope.data = "barfoo";
  //   $element.scope().$apply();
  //   //var changed_color = $element.css('background-color');
  //   console.log($($element[0]).find('.progress-bar').css('color'));
  //   //expect(changed_color).toBe($scope.color);
  // });

  it('should apply same height', function(){

    spyOn(window, 'initSameHeight');
    $element.scope().$apply();
    expect(window.initSameHeight).toHaveBeenCalled();
  });


});
