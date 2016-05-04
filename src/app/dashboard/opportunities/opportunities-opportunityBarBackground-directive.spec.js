describe('opportunityBarBackground', function(){

  var $element, $scope;

  beforeEach(module('livefeed.dashboard.opportunities'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {

    $scope = _$rootScope_;
    $scope.opportunity_data = 'foo';
    $scope.color = '#4CCC72';
    $element = _$compile_("<div data-color='color' data-data='opportunity_data' opportunity-bar-background></div>")(_$rootScope_);

  }));

  it('should apply color and background color to progress bar', function(){
    setStyleFixtures('.progress-bar { background-color: #4CCC72; color: #4CCC72}');
    fixture = setFixtures('<div class="progress-block"><div class="progress"><div class="progress-bar"></div></div></div>');
    $element.scope().$apply();
    var span = fixture.find('.progress-bar');
    expect(span.css('background-color')).toEqual('rgb(76, 204, 114)');
    expect(span.css('color')).toEqual('rgb(76, 204, 114)');
  });


});