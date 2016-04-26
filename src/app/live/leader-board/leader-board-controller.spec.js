describe('LeaderBoardCtrl', function(){

  var $rootScope, controller;

  beforeEach(module('livefeed.live.leader_board'));

  beforeEach(inject(function(_$rootScope_, $controller) {

    $rootScope = _$rootScope_;
    controller = $controller('LeaderBoardCtrl', { $scope: $rootScope });
    $rootScope.leader_board_data = {
      "branches" : [
        {
          "branch" : {
            "branch_id": 1,
            "branch_name": "WestWood"
          },
          "city": {
            "city_id": 3,
            "city_name": "Lahore"
          },
          "count": 3
        }
      ]
    };

  }));

  describe('leader_board method', function(){
    it('init scope array when function calls', function(){
      controller.leader_board();
      expect($rootScope.branches[0].branch.branch_name).toEqual("WestWood");
    });
  });

  describe('$rootScope.$on method', function(){
    it('should respond to the "live-data-received" event', function(){
      spyOn(controller, 'leader_board');
      $rootScope.$broadcast('live-data-received');
      expect(controller.leader_board).toHaveBeenCalled();
    });
  });

});
