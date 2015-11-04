angular.module( 'livefeed.dashboard.overall_rating', [
  'factories',
  'livefeed.chart',
  "helper_factories",
  'angular-flot'
])

.controller( 'OverallRatingCtrl', function DashboardController( $scope, _, chartService, Graphs, Global ) {

  $scope.line1 = {
    data: [],
    options: {}
  };
  $scope.mainView = true;
  
  function mainRating(){
    $scope.mainView = true;
    Graphs.overall_rating().$promise.then(function(data){
      $scope.line1 = chartService.getLineChart(data);
      $scope.labels = _.map(data[0].data.feedbacks ,function(value){
        return {id: value.option_id, value: value.option__text, color: Global.optionsColorScheme[value.option__text]};
      });    
    });
  }

  mainRating();


  $scope.optionClick = function (event, pos, item){
    $scope.mainView = false;
    var option = $scope.labels[item.seriesIndex];
    Graphs.overall_rating(option.id).$promise.then(function(data){
      $scope.line1 = chartService.getLineChart(data);
      $scope.labels = _.map(data[0].data.feedbacks ,function(value){
        return {id: value.option_id, value: value.option__text, color: Global.optionsColorScheme[value.option__text]};
      });
    });
  };

  $scope.backToMain = function(){
    console.log("clicked");
    mainRating();
  };
});
