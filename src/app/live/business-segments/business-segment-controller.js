(function() {
  angular.module( 'livefeed.live.business_segment')

  .controller( 'BusinessSegmentCtrl', function BusinessSegmentCtrl( $scope, $rootScope, Global ) {

    var vm = this;
    vm.business_segment = business_segment;
    
    function business_segment(){
      var qsc = {workplace: [], culture: [], food: []};
      $scope.segmentation_rating = [];
      $scope.business_segments_labels = [];

      _.each($scope.segmentation_ratings.segments[0].option_data, function(value) {
        $scope.business_segments_labels.push({option_name: value.option__text, option_class: Global.liveQscClass[value.option__text]});
      });
      $scope.business_segments_labels = _.sortBy($scope.business_segments_labels, function (value) { return Global.liveQscPriority[value.option_name];});
      _.each($scope.segmentation_ratings.segments, function(value, index){
        _.each(value.option_data, function(item){
          if (item.option__text === 'Workplace'){
            qsc.workplace.push(item.count);
          }
          if (item.option__text === 'Culture'){
            qsc.culture.push(item.count);
          }
          if (item.option__text === 'Food'){
            qsc.food.push(item.count);
          }
        });
        $scope.segmentation_rating.push({"category":value.segment.toUpperCase(), "column-1": qsc.workplace[index], "column-2":qsc.food[index],"column-3":qsc.culture[index]});
      });
    }

    $rootScope.$on('live-data-received', function (event, data) {
      vm.business_segment();
    });

  });

})();

