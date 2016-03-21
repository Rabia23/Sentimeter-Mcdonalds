(function() {
  
  angular.module('livefeed.dashboard.age_group_analysis')

  .factory('GenderColors', function() {

    var chart_color = {
      "MEN": "#26AAE2",
      "FEMALE": "#F174AC"
    };

    return {

      get_male_color:function(){
        return chart_color["MEN"];
      },
      get_female_color :function(){
        return chart_color["FEMALE"];
      }
    };
  });

})();