(function() {
  angular.module( 'livefeed.promotions')

  .factory('PromotionsChartTypeEnum', [function() {

    var chart_type = {
      "Bar Chart": 5,
      "Pie Chart": 4
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