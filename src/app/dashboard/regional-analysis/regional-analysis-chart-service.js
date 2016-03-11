angular.module('livefeed.regional_analysis.chart', [
  'helper_factories'
])
.service('regionalAnalysisChartService', function(Global, PatchStatusEnum){
  return {

      getDonutChartData: function(graph_data, question_type){
      return {
        objects: _.map(graph_data.analysis,  function(data){
          return {
            name: data.object.name, id: data.object.id, show_chart: data.data.feedback_count === 0 ? false : true
          };
        }),
        donutData: _.map(graph_data.analysis,  function(data){
          return   _.map(data.data.feedbacks,  function(dat){ return {id: dat.option_id, label: dat.option__text, value: dat.count};});
        }),
        donutOptions: _.map(graph_data.analysis,  function(data){
          return   {
              colors: _.map(data.data.feedbacks, function(dat){
                return (question_type == 1) ? Global.mainRatingColorScheme[dat.option__text] : dat.option__color_code;
              })
            };
        })
      };
    },

    getSubDonutChartData: function(graph_data,string){
      return {
          donutData: _.map(graph_data.feedbacks,  function(data){
            return {label: data.option__text, value: data.count};
          }),
          donutOptions: {colors: _.map(graph_data.feedbacks,  function(data){
            return data.option__color_code;
            })
          }
       };
    },

    getComplaintsDonutChartData: function(graph_data){
      _.each(graph_data.analysis, function(data){
        var count = 0;
        _.each(data.data.action_analysis,  function(dat) {
          if( dat.action_taken === PatchStatusEnum.get_skip_label_index() ){
            count = count + dat.count;
          }
        });
        data.data.feedback_count = data.data.feedback_count - count;
      });
      _.map(graph_data.analysis, function(data){
         data.data.action_analysis = _.filter(data.data.action_analysis,  function(dat) { return dat.action_taken !== PatchStatusEnum.get_skip_label_index(); });
      });
      return {
        objects: _.map(graph_data.analysis,  function(data){
          return {
            name: data.object.name, id: data.object.id, show_chart: data.data.feedback_count === 0 ? false : true
          };
        }),
        donutData: _.map(graph_data.analysis,  function(data){
          return   _.map(data.data.action_analysis,  function(dat){
            return {label: Global.complaintAnalysisAction[dat.action_taken][0], value: dat.count, action_taken: dat.action_taken};
          });
        }),
        donutOptions: _.map(graph_data.analysis,  function(data){
          return   {
              colors: _.map(data.data.action_analysis, function(dat){
                return Global.complaintAnalysisAction[dat.action_taken][1];
              })
            };
        })
      };
    }
  };
});