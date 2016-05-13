describe('ageGroupAnalysisBarChart', function(){

  var $element, $scope, $timeout;

  beforeEach(module('livefeed.dashboard.age_group_analysis'));

  beforeEach(inject(function( _$compile_, _$rootScope_, _$timeout_ ) {

    $scope = _$rootScope_;
    $scope.data = 'foo';
    $timeout = _$timeout_;
    $element = _$compile_("<div age-group-analysis data-data ='data'> </div")(_$rootScope_);



  }));

  it('should apply same height', function(){
    setStyleFixtures('.equal-height { height: 392px }');
    fixture = setFixtures('<div class="equal-height same-height-left"></div>');
    $element.scope().$apply();
    $timeout.flush();
    var span = fixture.find('.equal-height');
    expect(span.css('height')).toEqual('392px');

  });

  it('should create pie chart', function(){
    spyOn(AmCharts, 'makeChart');
    $element.scope().$apply();
    expect(AmCharts.makeChart).toHaveBeenCalled();
  });


});