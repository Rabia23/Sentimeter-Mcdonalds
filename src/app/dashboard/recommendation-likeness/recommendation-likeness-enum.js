(function() {
  angular.module( 'livefeed.dashboard.recommendation_likeness')

  .factory('RecommendationEnum', [function() {
    var color = "#4CCC72";
    return {
      getRecommendationBarChartColor: function(){
        return color;
      }
    };

  }]);

})();