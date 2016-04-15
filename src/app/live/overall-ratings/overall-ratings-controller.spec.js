describe('OverallRatingCtrl', function(){

  var $rootScope, controller;

  beforeEach(module('livefeed.live.overall-ratings'));
  beforeEach(module('helper_factories'));

  beforeEach(inject(function(_$rootScope_, $controller) {

    $rootScope = _$rootScope_;
    controller = $controller('OverallRatingCtrl', { $scope: $rootScope });
    $rootScope.overall_feedback = {
      "feedback_count": 4,
      "feedbacks": [
        {
          "count": 0,
          "option__color_code": null,
          "option__parent_id": null,
          "option__score": 4,
          "option__text": "I'm lovin' it",
          "option_id": 57
        }
      ]
    };

  }));

  describe('rating method', function(){
    it('init scope array when function calls', function(){
      controller.rating();
      expect($rootScope.overall_rating_data[0].category).toEqual("I'M LOVIN' IT");
    });
  });

  describe('$rootScope.$on method', function(){
    it('should respond to the "live-data-received" event', function(){
      spyOn(controller, 'rating');
      $rootScope.$broadcast('live-data-received');
      expect(controller.rating).toHaveBeenCalled();
    });
  });

});
