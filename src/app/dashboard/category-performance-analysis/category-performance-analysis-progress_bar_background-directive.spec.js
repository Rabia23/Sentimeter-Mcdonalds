describe('progressBarBackground', function(){

  var $element, $scope;

  beforeEach(module('livefeed.dashboard.category_performance_analysis'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {

    $scope = _$rootScope_;
    $scope.category_data = 'foo';
    $scope.color = '##1f9aec';
    $element = _$compile_("<div data-color='color' data-data='category_data' progress-bar-background></div>")(_$rootScope_);

  }));

  it('should apply color and background color to progress bar', function(){
    setStyleFixtures('.progress-bar { background-color: #1f9aec; color: #1f9aec}');
    fixture = setFixtures('<div class="progress-block main"><div class="progress"><div class="progress-bar"></div></div></div>');
    $element.scope().$apply();
    var span = fixture.find('.progress-bar');
    expect(span.css('background-color')).toEqual('rgb(31, 154, 236)');
    expect(span.css('color')).toEqual('rgb(31, 154, 236)');
  });


});