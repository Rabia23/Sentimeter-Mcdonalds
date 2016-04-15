describe('StrengthCtrl', function(){

  var $rootScope, controller;

  beforeEach(module('livefeed.live.strength'));
  beforeEach(module('helper_factories'));

  beforeEach(inject(function(_$rootScope_, $controller) {

    $rootScope = _$rootScope_;
    controller = $controller('StrengthCtrl', { $scope: $rootScope });
    $rootScope.strength = {
      "feedback_count": 99,
      "feedbacks": [
        {
          "count": 19,
          "option__parent_id": null,
          "option__score": 0,
          "option__text": "Quality of Food",
          "option_id": 37
        },
        {
          "count": 19,
          "option__parent_id": null,
          "option__score": 0,
          "option__text": "Friendly & Courteous Staff",
          "option_id": 38
        }
      ]
    };

  }));

  describe('strength method', function(){
    it('init scope array when function calls ', function(){
      controller.strength();
      expect($rootScope.strength_data[0].category).toEqual("Quality of Food");
    });
  });

  describe('$rootScope.$on method', function(){
    it('should respond to the "live-data-received" event', function(){
      spyOn(controller, 'strength');
      $rootScope.$broadcast('live-data-received');
      expect(controller.strength).toHaveBeenCalled();
    });
  });

});
