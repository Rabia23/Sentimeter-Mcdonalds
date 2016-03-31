describe('PromotionsChartTypeEnum', function(){
  
  var factory;
  beforeEach(module('livefeed.promotions'));

  beforeEach(inject(function(_PromotionsChartTypeEnum_) {
    factory = _PromotionsChartTypeEnum_;
  }));


  describe('get_bar_chart_value', function(){

    it('is present', function(){
      expect(factory.get_bar_chart_value).toEqual(jasmine.any(Function))
    });

    it('returns enum value', function(){
      expect(factory.get_bar_chart_value()).toBe(5);
    })

  });


  describe('get_pie_chart_value', function(){

    it('is present', function(){
      expect(factory.get_pie_chart_value).toEqual(jasmine.any(Function))
    });

    it('returns enum value', function(){
      expect(factory.get_pie_chart_value()).toBe(4);
    })

  });

});