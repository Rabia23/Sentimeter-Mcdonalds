(function() {
  angular.module( 'livefeed.live.business_segment')

  .controller( 'BusinessSegmentCtrl', function BusinessSegmentCtrl( $scope, $rootScope, Global ) {

    var vm = this;
    vm.business_segment = business_segment;
    
    function business_segment(){
      var qsc = {quality: [], service: [], cleanliness: []};
      $scope.segmentation_rating = [];
      $scope.business_segments_labels = [];

      _.each($scope.segmentation_ratings.segments[0].option_data, function(value) {
        $scope.business_segments_labels.push({option_name: value.option__text, option_class: Global.liveQscClass[value.option__text]});
      });
      $scope.business_segments_labels = _.sortBy($scope.business_segments_labels, function (value) { return Global.liveQscPriority[value.option_name];});
      _.each($scope.segmentation_ratings.segments, function(value, index){
        _.each(value.option_data, function(item){
          if (item.option__text === 'Quality'){
            qsc.quality.push(item.count);
          }
          if (item.option__text === 'Service'){
            qsc.service.push(item.count);
          }
          if (item.option__text === 'Cleanliness'){
            qsc.cleanliness.push(item.count);
          }
        });
        $scope.segmentation_rating.push({"category":value.segment.toUpperCase(), "column-1": qsc.cleanliness[index], "column-2":qsc.service[index],"column-3":qsc.quality[index]});
      });
    }

    $rootScope.$on('live-data-received', function (event, data) {
      vm.business_segment();
    });

  });

})();

