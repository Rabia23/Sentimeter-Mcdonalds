describe('QuestionnaireChartTypeEnum', function(){

  var factory;
  beforeEach(module('livefeed.questionnaire'));

  beforeEach(inject(function(_QuestionnaireChartTypeEnum_) {
    factory = _QuestionnaireChartTypeEnum_;
  }));


  describe('get_bar_chart_value', function(){

    it('is present', function(){
      expect(factory.get_bar_chart_value).toEqual(jasmine.any(Function));
    });

    it('returns enum value', function(){
      expect(factory.get_bar_chart_value()).toBe(11);
    });

  });


  describe('get_pie_chart_value', function(){

    it('is present', function(){
      expect(factory.get_pie_chart_value).toEqual(jasmine.any(Function));
    });

    it('returns enum value', function(){
      expect(factory.get_pie_chart_value()).toBe(10);
    });

  });

});