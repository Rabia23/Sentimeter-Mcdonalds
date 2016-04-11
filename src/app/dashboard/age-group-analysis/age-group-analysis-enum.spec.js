describe('AgeGroupAnalysisEnum', function(){

  var factory;
  beforeEach(module('livefeed.dashboard.age_group_analysis'));

  beforeEach(inject(function(_GenderColors_) {
    factory = _GenderColors_;
  }));


  describe('get male color value', function(){

    it('is present', function(){
      expect(factory.get_male_color).toEqual(jasmine.any(Function));
    });

    it('returns male color value', function(){
      expect(factory.get_male_color()).toBe("#26AAE2");
    });

  });

  describe('get female color value', function(){

    it('is present', function(){
      expect(factory.get_female_color).toEqual(jasmine.any(Function));
    });

    it('returns female color value', function(){
      expect(factory.get_female_color()).toBe("#F174AC");
    });

  });

});