describe('ageGroupAnalysisBarChart', function(){

  var $element, $scope;

  beforeEach(module('livefeed.dashboard.age_group_analysis'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {

    $scope = _$rootScope_;
    $scope.men_color = '#26AAE2';
    $scope.female_color = '#F174AC';
    $male_element = _$compile_("<span gender-bullet data-color = 'men_color'></span>")(_$rootScope_);
    $female_element = _$compile_("<span gender-bullet data-color = 'female_color'></span>")(_$rootScope_);

  }));

  it('should apply background color to male bullet', function(){
    setStyleFixtures('.bullet { background-color: #26AAE2 }');
    fixture = setFixtures('<span class="bullet" gender-bullet data-color = "men_color"></span>');
    $male_element.scope().$apply();
    var span = fixture.find('.bullet');
    expect(span.css('background-color')).toEqual('rgb(38, 170, 226)');

  });

  it('should apply background color to female bullet', function(){
    setStyleFixtures('.bullet { background-color: #F174AC }');
    fixture = setFixtures('<span class="bullet" gender-bullet data-color = "female_color"></span>');
    $female_element.scope().$apply();
    var span = fixture.find('.bullet');
    expect(span.css('background-color')).toEqual('rgb(241, 116, 172)');

  });


});