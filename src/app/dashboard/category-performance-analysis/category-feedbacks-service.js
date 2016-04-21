(function() {
  angular.module('livefeed.dashboard.category_performance_analysis.feedback_service', 
  [])
  
  .service('feedbackService', function(){

    return {
      getCategoryFeedbacks: function(data, feedback_count, option_id, string){
        var id = data.option_id;
        var name = data.option__text;
        var complaints = data.count;
        var percentage = data.count === 0 ? 0 : Math.round((data.count / feedback_count) * 100);
        var colour =  data.option__color_code;
        return {
          id: id, name: name, complaints: complaints, percentage: percentage, colour: colour };
      },
      getSegmentFeedbacks: function(data, option_id, string){
        return {
          name: data.segment,
          total_feedback_count: data.feedback_count,
          total_option_count: data.option_count,
          show_string: data.option_count === 0 ? true : false,
          data: _.map(data.option_data, function (dat) {
            return dat.count;
          }),
          labels: _.map(data.option_data, function (dat) {
            return dat.option__text;
          }),
          colors: _.map(data.option_data, function (dat) {
            return dat.option__color_code;
          }),
          options: {
            percentageInnerCutout: 70,
            tooltipTemplate: "<%if (label) %><%= value %>",
            tooltipYPadding: 4,
            tooltipXPadding: 2,
            tooltipCornerRadius: 0,
            tooltipFontSize: 14
          }
        };
      }

    };
  });

})();
