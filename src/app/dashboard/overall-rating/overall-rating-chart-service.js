angular.module('livefeed.overall_rating.chart', [
  'helper_factories'
])
.service('overallRatingChartService', function(Global){
  return {

    getAreaSegmentChart: function(graph_data){
      var segment_data = [];
      var segment_array = {};


      var segments = _.map(graph_data[0].segment_list ,function(value, index){
        segment_data.push({category: value.segment});
        return value.segment;
      });

      _.each(segments, function(value){
        segment_array[value] = [];
      });

      _.each(graph_data, function(value, upper_index){
        var list = value.segment_list;
        _.each(list, function(list_value, index){
          segment_array[list_value.segment].push(list_value.option_count);
        });
      });
      var inc = 0;
      _.each(segment_array, function(value,upper_index){
        _.each(value, function(value, index){
           segment_data[inc]["column-"+(index+1)] = value;
        });
        inc = inc + 1;
      });
      return {data: segment_data, labels: segments};
    },
    getAreaLabelChart: function(graph_data) {
      
      var label_data = [];
      var label_array = {};
      
      var labels = _.map(graph_data[0].data.feedbacks, function (value, index) {
        return {value: value.option__text, color: value.option__color_code, column: "column-" + (index + 1)};
      });
      _.each(labels, function (val, index) {
        label_array[val.value] = {column: (index+ 1)};
      });

      
      _.each(graph_data, function (value, upper_index) {
        var new_date_array = value.date.split("-");
        var date = new_date_array[2] + "-" + new_date_array[1] + "-" + new_date_array[0].substr(2, 2);
        label_data.push({category: date});
        _.each(value.data.feedbacks, function (item) {
          var index = label_array[item.option__text].column;
          label_data[upper_index]["column-" + (index)] = item.count;
          label_data[upper_index]["column-" + (index) + "-id"] = item.option_id;
        });
      });

      return {data: label_data, labels: labels};
    }
  };
});
