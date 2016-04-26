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
          "count": 9,
          "option__color_code": "#F0C547",
          "option__parent_id": null,
          "option__score": 0,
          "option__text": "A delicious & healthy lunch",
          "option_id": 29
        },
        {
          "count": 6,
          "option__color_code": "#3598DC",
          "option__parent_id": null,
          "option__score": 0,
          "option__text": "On-site daycare",
          "option_id": 27
        }
      ]
    };

  }));

  describe('strength method', function(){
    it('init scope array when function calls ', function(){
      controller.strength();
      expect($rootScope.strength_data[0].category).toEqual("A delicious & healthy lunch");
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
