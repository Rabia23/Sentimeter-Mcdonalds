(function() {
    angular.module('livefeed.dashboard')

    .controller( 'DashboardCtrl', function DashboardController( $scope, $rootScope, flashService, Graphs) {
      $scope.show_loading = true;

      $rootScope.page_heading = "Dashboard";

      $rootScope.$on('app-online', function(event, args) {
        console.log("online in dashboard");
      });

      $rootScope.$on('app-offline', function(event, args) {
        console.log("offline in dashboard");
      });

      Graphs.top_charts().$promise.then(function(data){
        if(data.success) {
          $scope.chart_data = data.response;
          $scope.show_loading = false;
        }
        else{
          flashService.createFlash(data.message, "danger");
        }
      });

      var $chart;
      $rootScope.chartInstances = [];
      $scope.$on('create', function (event, chart) {
        if(chart.chart.canvas.id === "bar"){
          if (typeof $chart !== "undefined") {
            $chart.destroy();
          }
          $chart = chart;
        }
        if(chart.chart.canvas.id === "doughnut"){
          $rootScope.chartInstances.push(chart);
        }
      });

    });

})();