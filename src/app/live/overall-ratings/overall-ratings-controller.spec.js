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
          "count": 10,
          "option__color_code": "#0E590A",
          "option__parent_id": null,
          "option__score": 5,
          "option__text": "Very happy",
          "option_id": 5
        }
      ]
    };

  }));

  describe('rating method', function(){
    it('init scope array when function calls', function(){
      controller.rating();
      expect($rootScope.overall_rating_data[0].category).toEqual("VERY HAPPY");
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
