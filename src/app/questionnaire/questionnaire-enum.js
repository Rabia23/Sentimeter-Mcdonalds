(function() {
  angular.module( 'livefeed.questionnaire')

  .factory('QuestionnaireChartTypeEnum', [function() {

    var chart_type = {
      "Bar Chart": 11,
      "Pie Chart": 10
    };

    return {

      get_bar_chart_value :function(){
        return chart_type["Bar Chart"];
      },
      get_pie_chart_value :function(){
        return chart_type["Pie Chart"];
      }
    };

  }]);

})();