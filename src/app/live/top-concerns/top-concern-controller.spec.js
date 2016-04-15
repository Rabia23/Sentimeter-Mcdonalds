describe('TopConcernCtrl', function(){

  var $rootScope, controller;

  beforeEach(module('livefeed.live.top_concerns'));
  beforeEach(module('helper_factories'));

  beforeEach(inject(function(_$rootScope_, $controller) {

    $rootScope = _$rootScope_;
    controller = $controller('TopConcernCtrl', { $scope: $rootScope });
    $rootScope.concerns = {
      "concern_count": 5,
      "concern_list": [
        {
          "id": 1,
          "name": "Bun",
          "weight": 37
        },
        {
          "id": 24,
          "name": "Wifi",
          "weight": 37
        }
      ]

    };

  }));

  describe('strength method', function(){
    it('init scope array when function calls ', function(){
      controller.top_concern();
      expect($rootScope.top_concern_data[0].category).toEqual("BUN [Burnt, Dry]");
    });
  });

  describe('$rootScope.$on method', function(){
    it('should respond to the "live-data-received" event', function(){
      spyOn(controller, 'top_concern');
      $rootScope.$broadcast('live-data-received');
      expect(controller.top_concern).toHaveBeenCalled();
    });
  });

});
