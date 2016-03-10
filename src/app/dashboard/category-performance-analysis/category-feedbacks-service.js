(function() {
  angular.module('livefeed.dashboard.category_performance_analysis.feedback_service', 
  [])
  
  .service('feedbackService', function(_, Global){

    return {
      getCategoryFeedbacks: function(data, feedback_count, option_id, string){
        var id = data.option_id;
        var name = data.option__text;
        var complaints = data.count;
        var percentage = data.count === 0 ? 0 : Math.round((data.count / feedback_count) * 100);
        var priority = option_id == null ? Global.qscPriority[data.option__text] : Global.qscSubCategoriesData[string][data.option__text].priority;
        var colour = option_id == null ? Global.categoryPerformanceClass[data.option__text] : Global.qscSubCategoriesData[string][data.option__text].color;
        return {
          id: id, name: name, complaints: complaints, percentage: percentage, priority: priority, colour: colour };
      },
      getSegmentFeedbacks: function(data, option_id, string){
        return {
          name: data.segment,
          show_string: data.option_count === 0 ? true : false,
          data: _.map(data.option_data, function (dat) {
            return dat.count;
          }),
          labels: _.map(data.option_data, function (dat) {
            return dat.option__text;
          }),
          colors: _.map(data.option_data, function (dat) {
            return option_id == null ? Global.categoryPerformanceClass[dat.option__text] : Global.qscSubCategoriesData[string][dat.option__text].color;
          }),
          options: {
            percentageInnerCutout: 70,
            tooltipTemplate: "<%if (label) %><%= value %>",
            tooltipYPadding: 4,
            tooltipXPadding: 2,
            tooltipCornerRadius: 0,
            tooltipFontSize: 14
          },
          priority: Global.segmentationPriority[data.segment]
        };
      }

    };
  });

})();