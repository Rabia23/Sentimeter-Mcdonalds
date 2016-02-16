(function() {
    angular.module('livefeed.live')
    .controller( 'LiveCtrl', function LiveController( $scope,  _ , $rootScope, $state, Authentication, Api, WebSocket, Global, Clock, $interval, $timeout) {
      $scope.authenticate = {};
      var ping_live = true;



      $rootScope.$on('app-online', function(event, args) {
        console.log("online");
        WebSocket.init();
        //live_dashboard();
        $timeout(function() {
            live_dashboard();
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


      live_dashboard();

      WebSocket.init();

      $rootScope.$on('live-data-received', function (event, data) {
        top_rankings();
      });


      function top_rankings(){
          $scope.qsc_ranking = _.map($scope.top_ranking.qsc_count, function(value){
            return { option_name: value.option_text, option_count: value.count, priority: Global.qscPriority[value.option_text] };
          });
          $scope.qsc_ranking = _.sortBy($scope.qsc_ranking, function (value) { return value.priority; });
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



      var display = function(){
        var date = new Date();
        $scope.time = Clock.formatAMPM(date);

        var date_string = date.toString().split(" ");
        console.log(date_string);
        $scope.date_output = date_string[0] + " - " + date_string[1] + " " + date_string[2] + " - " + date_string[3].substr(2,2);
      };

      display();

      $interval(display, 1000 * 60);


      $rootScope.$on('web-socket-close', function (event, data) {
        WebSocket.close_socket();
        if($rootScope.currentState == 'live'){
          WebSocket.init();
        }
      });
    });
})();