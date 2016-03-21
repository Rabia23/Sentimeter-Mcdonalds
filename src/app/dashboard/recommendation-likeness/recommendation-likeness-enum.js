(function() {

  angular.module('livefeed.dashboard.recommendation_likeness')

  .factory('AverageBarColors', function() {

    var bar_colors = ["#ac1a1a", "#e73a3a", "#01ad0f", "#0e590a"];

    return {

      get_bar_color:function(index){
        return bar_colors[index];
      }
    };
  });

})();