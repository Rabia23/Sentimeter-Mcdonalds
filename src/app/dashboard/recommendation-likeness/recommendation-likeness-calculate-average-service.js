(function() {
  angular.module('livefeed.dashboard.recommendation_likeness.average_service',
  [])

  .service('calculateAverageService', function(_, Global){

    return {
      getAverage: function(data, feedback_count){
        var average = 0, total_average = 0;
        _.each(data, function(item){
          average = average + item.count * (item.option__text/10);
        });
        total_average = Math.round(((average * 10)/feedback_count)*10);

        return total_average;
      }
    };
  });

})();