(function() {
  angular.module('livefeed.live.leader_board')


  .controller('LeaderBoardCtrl', function BenchmarkMapController($scope, $rootScope) {

    var vm = this;
    vm.leader_board = leader_board;

    function leader_board(){
      $scope.branches = _.sortBy($scope.leader_board_data.branches, function (value) { return value.count; });
      $scope.branches.reverse();
    }

    $rootScope.$on('live-data-received', function (event, data) {
      vm.leader_board();
    });
  
  });

})();