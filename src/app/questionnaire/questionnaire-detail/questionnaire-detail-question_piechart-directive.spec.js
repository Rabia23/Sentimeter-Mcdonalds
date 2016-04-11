describe('questionnaireQuestionPieChart', function(){

  var $element, $scope, $timeout;

  beforeEach(module('livefeed.questionnaire'));

  beforeEach(inject(function( _$compile_, _$rootScope_, _$timeout_ ) {

    $scope = _$rootScope_;
    $scope.data = 'foo';
    $timeout = _$timeout_;
    $element = _$compile_("<div questionnaire-pie-chart data-data='data'> </div")(_$rootScope_);



  }));

  it('should apply same height', function(){

    spyOn(window, 'initSameHeight');
    $element.scope().$apply();
    $timeout.flush();
    expect(window.initSameHeight).toHaveBeenCalled();

  });

  it('should create pie chart', function(){
    spyOn(AmCharts, 'makeChart');
    $element.scope().$apply();
    expect(AmCharts.makeChart).toHaveBeenCalled();
  });


});