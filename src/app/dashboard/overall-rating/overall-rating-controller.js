(function() {
  angular.module('livefeed.dashboard.overall_rating')

  .controller( 'TimeLineCtrl', function DashboardController( $scope, overallRatingChartService, Graphs, Global, flashService ) {
    $scope.height = 0;
    $scope.width = 0;

    $scope.today = new Date();

    $scope.mainView = true;
    $scope.optionView = false;

    $scope.page = 1;
    $scope.max_page = 1;

    var start_date = null;
    var end_date = null;

    function resetDates(){
      $scope.date = {
        startDate: moment().subtract(6, "days"),
        endDate: moment()
      };
    }

    $scope.datePickerOption = {
      eventHandlers: {
        'apply.daterangepicker': function(ev, picker){
          $scope.show_loading = true;
          if($scope.mainView){
            start_date = ev.model.startDate._i;
            end_date = ev.model.endDate._i;
            $scope.mainRating();
          }

        }
      },
      opens: "left"
    };

    function calculate_data_sets(data, value){
      $scope.data_array = [];
      if (data.response.length > value) {
        var sets = data.response.length / value;
        while (data.response.length > 0) {
          $scope.data_array.push(data.response.splice(0, value));
        }
      }
      else {
        $scope.data_array[0] = data.response;
      }
      $scope.max_page = $scope.data_array.length;
    }

    function getLabelColor(timelinedata, value){
      var label_value;
      _.each(timelinedata.labels, function(val, ind){
        if(val.value === value.option__text){
          label_value = val;
        }
      });

      return label_value;

    }

    function drawGraph(data, feedbacks){
      $scope.overall_rating_data = [];

      var timelinedata = overallRatingChartService.getAreaLabelChart(data);
      $scope.labels = _.map(feedbacks, function (value, index) {
        
        var label_value = getLabelColor(timelinedata, value);
        
        return {
          option_id: value.option_id,
          option_name: value.option__text,
          parent_id: value.option__parent_id,
          color: label_value.color,
          lineColor: label_value.color,
          title: value.option__text,
          id:  label_value.column + "-id",
          valueField: label_value.column
        };
      });
      $scope.overall_rating_data = [$scope.labels, timelinedata.data];
    }

    function calculate_option_labels(feedbacks){
      $scope.labels = _.map(feedbacks ,function(value, index){
          return {
            option_id: value.option_id,
            option_name: value.option__text,
            parent_id: value.option__parent_id,
            color: value.option__color_code,
            lineColor: value.option__color_code,
            title: value.option__text,
            id: "column-"+(index+1)+"-id",
            valueField: "column-"+(index+1)
          };
      });
    }
    $scope.mainRating = function(option){

      $scope.show_loading = true;
      $scope.optionView = false;
      var option_id = (option)? option.option_id : null;
      $scope.mainView = (option)? false : true;
      Graphs.overall_rating(option_id, start_date, end_date).$promise.then(function (data) {
        if(data.success) {
          if($scope.width < $scope.height) {
            calculate_data_sets(data, 3);
          }
          else {
            calculate_data_sets(data, 7);
          }
          $scope.page = 1;
          drawGraph($scope.data_array[0], $scope.data_array[0][0].data.feedbacks);
          $scope.show_loading = false;
        }
        else{
          flashService.createFlash(data.message, "danger");
        }
      });
    };

    function drawOptionGraph(data){
      $scope.overall_rating_data = [];
      $scope.overall_rating_data = [$scope.labels, data];
    }

    $scope.optionClick = function (option_object){
      $scope.option_object = option_object;
      var option_id = option_object.item.dataContext[option_object.graph.id];
      var date = option_object.item.category;
      if(option_id !== undefined) {
        $scope.show_loading = true;

        Graphs.feedback_segmentation(date, option_id).$promise.then(function (data) {
          $scope.show_loading = false;
          if (data.success) {
            $scope.mainView = false;
            $scope.optionView = true;
            if (data.response.options !== undefined) {
              var qsc_suboptions_data;
              qsc_suboptions_data = overallRatingChartService.getAreaSegmentChart(data.response.options);
              $scope.labels = _.map(data.response.options, function (value, index) {
                var label_value = getLabelColor(qsc_suboptions_data, value);
                return {
                  option_name: value.option__text,
                  parent_id: "",
                  color: value.option__color_code,
                  lineColor: value.option__color_code,
                  title: value.option__text,
                  id: "column-"+(index+1)+"-id",
                  valueField: "column-"+(index+1)
                };
              });
              
              $scope.segments_data_array = [];
              $scope.page = 1;
              $scope.max_page = 1;
              if($scope.width < $scope.height) {
                while (qsc_suboptions_data.data.length > 0) {
                  $scope.segments_data_array.push(qsc_suboptions_data.data.splice(0, 3));
                }
                $scope.max_page = $scope.segments_data_array.length;
                drawOptionGraph($scope.segments_data_array[0]);
              }
              else {
                drawOptionGraph(qsc_suboptions_data.data);
              }
            }
          }
          else {
            flashService.createFlash(data.message, "danger");
          }
        });
      }
    };


    $scope.axisChanged = function(){
      $scope.show_loading = true;
      $scope.mainRating();
    };

    $scope.Next = function(){
      if($scope.page < $scope.max_page){
        $scope.page = $scope.page + 1;
        drawGraph($scope.data_array[($scope.page -1 )], $scope.data_array[0][0].data.feedbacks);
      }
    };

    $scope.optionNext = function(){
      if($scope.page < $scope.max_page){
        $scope.page = $scope.page + 1;
        drawOptionGraph($scope.segments_data_array[($scope.page -1 )]);
      }
    };

    $scope.backToMain = function() {
      $scope.mainRating();
    };

    $scope.Prev = function(){
      if($scope.page > 1){
        $scope.page = $scope.page - 1;
        drawGraph($scope.data_array[($scope.page -1 )], $scope.data_array[0][0].data.feedbacks);
      }
    };

    $scope.optionPrev = function(){
      if($scope.page > 1){
        $scope.page = $scope.page - 1;
        drawOptionGraph($scope.segments_data_array[($scope.page -1 )]);
      }
    };

    resetDates();
  });
})();
