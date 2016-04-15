(function() {
  angular.module('livefeed.live')

  .controller( 'LiveCtrl', function LiveController( $scope, $rootScope, Api, WebSocket, Global, Clock, $interval, $timeout) {

    var vm = this;
    vm.live_dashboard = live_dashboard;
    vm.top_rankings = top_rankings;
    vm.display = display;

    var ping_live = true;

    vm.display();

    $interval(display, 1000 * 60);

    vm.live_dashboard();

    WebSocket.init();

    $rootScope.$on('app-online', function(event, args) {
      console.log("online");
      WebSocket.init();
      $timeout(function() {
        vm.live_dashboard();
      }, 5000);
    });

    $rootScope.$on('app-offline', function(event, args) {
      console.log("offline");
      WebSocket.close_socket();
    });


    function live_dashboard(){
      Api.live_dashboard().$promise.then(function(dat){
        var data = dat.response;
        $scope.top_ranking = data.top_rankings;
        $scope.overall_ratings = data.overall_rating;
        $scope.complaint_view = data.complaint_view;
        $scope.overall_feedback = data.overall_feedback;
        $scope.leader_board_data = data.leaderboard_view;
        $scope.segmentation_ratings = data.segmentation_rating;
        $scope.concerns = data.concerns;
        $scope.strength = data.strength;
        $rootScope.$broadcast('live-data-received');
      });
    }

    $rootScope.$on('live-data-received', function (event, data) {
      vm.top_rankings();
    });


    function top_rankings(){
      if($scope.top_ranking.top_segment.option_count === 0){
        $scope.top_ranking.top_segment.segment = "N/A";
      }
      $scope.qsc_ranking = _.map($scope.top_ranking.qsc_count, function(value){
        return { option_name: value.option__text, option_count: value.count, priority: Global.qscPriority[value.option__text] };
      });
      $scope.qsc_ranking = _.sortBy($scope.qsc_ranking, function (value) { return value.priority; });
      console.log($scope.qsc_ranking);
    }

    $rootScope.$on('web-socket-message', function (event, data) {
      var dat = JSON.parse(data);
      $scope.top_ranking = dat.top_rankings;
      $scope.overall_ratings = dat.overall_rating;
      $scope.complaint_view = dat.complaint_view;
      $scope.overall_feedback = dat.overall_feedback;
      $scope.leader_board_data = dat.leaderboard_view;
      $scope.segmentation_ratings = dat.segmentation_rating;
      $scope.concerns = dat.concerns;
      $scope.strength = dat.strength;
      $rootScope.$broadcast('live-data-received');
      $scope.$digest();

    });

    function display(){
      var date = new Date();
      $scope.time = Clock.formatAMPM(date);
      var date_string = date.toString().split(" ");
      $scope.date_output = date_string[0] + " - " + date_string[1] + " " + date_string[2] + " - " + date_string[3].substr(2,2);
    }

    $rootScope.$on('web-socket-close', function (event, data) {
      WebSocket.close_socket();
      if($rootScope.currentState == 'live'){
        WebSocket.init();
      }
    });

  });

})();