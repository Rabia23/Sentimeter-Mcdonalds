(function() {
  angular.module( 'livefeed.dashboard.category_performance_analysis')

  .controller('CategoryPerformanceAnalysisCtrl', function CategoryPerformanceAnalysisCtrl($scope, Global, feedbackService, CategoryPerformanceApi, $timeout, flashService, $uibModal) {

    var category_performance_array = [];

    $scope.show_loading = false;
    $scope.class = '';
    $scope.option_id = null;

    $scope.today = new Date();

    $scope.show_error_message = false;

    $scope.mainView = true;

    function resetDates(){
      $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
      };
    }

    resetDates();

    $scope.start_date = null;
    $scope.end_date = null;

    $scope.datePickerOption = {
      eventHandlers: {
        'apply.daterangepicker': function(ev, picker){
          $scope.start_date = ev.model.startDate._i;
          $scope.end_date =  ev.model.endDate._i;
          $scope.showCategoryData("","","",$scope.option_id,$scope.class);
          $scope.showSegmentData("","","",$scope.option_id,$scope.class);
        },
        'cancel.daterangepicker': function(ev, picker){
        }
      },
      opens: "left"
    };

    $scope.showCategoryData = function(region_id,city_id,branch_id,option_id,string){
      category_performance_array = [];
      $scope.show_loading = true;
      CategoryPerformanceApi.category_performance(region_id,city_id,branch_id,option_id, $scope.start_date, $scope.end_date).$promise.then(function(performance_data){
        if(performance_data.success) {
          $scope.total_feedback_count = performance_data.response.feedback_count;
          if(performance_data.response.feedbacks.length > 6){
            category_performance_array.push(performance_data.response.feedbacks.splice(0, 6));
          }
          else{
            category_performance_array[0] = performance_data.response.feedbacks;
          }
          $scope.category_data = _.map(category_performance_array[0], function (data) {
             return feedbackService.getCategoryFeedbacks(data, performance_data.response.feedback_count, option_id, string);
          });
          $scope.category_data = _.sortBy($scope.category_data, function (value) {
            return value.priority;
          });

          if (option_id == null) {
            $scope.QualityID = $scope.category_data[0].id;
            $scope.ServiceID = $scope.category_data[1].id;
            $scope.CleanlinessID = $scope.category_data[2].id;
          }
        }
        else{
          flashService.createFlash(performance_data.message, "danger");
        }
      });
    };

    $scope.showSegmentData = function(region_id,city_id,branch_id,option_id,string) {
      CategoryPerformanceApi.segmentation_rating(region_id, city_id, branch_id, option_id, $scope.start_date, $scope.end_date).$promise.then(function (segment_data) {
        if(segment_data.success) {
          if(segment_data.response.segments[0].option_data.length > 6){
            _.each(segment_data.response.segments, function (data){
              var options_array = [];
              _.each(category_performance_array[0], function(item){
                _.each(data.option_data, function(option_object){
                  if(option_object.option__text == item.option__text){
                    options_array.push(option_object);
                  }
                });
              });
              data.option_data = options_array;
            });
          }
          $timeout(function () {
            $scope.segments = _.map(segment_data.response.segments, function (data) {
              return feedbackService.getSegmentFeedbacks(data, option_id, string);
            });
            $scope.segments = _.sortBy($scope.segments, function (value) {
              return value.priority;
            });
            $scope.show_loading = false;
          }, 500);
        }
        else{
          flashService.createFlash(segment_data.message, "danger");
        }
      });
    };


    $scope.onOptionSelect = function(string,option_id){
      if(string === 'All'){
        $scope.mainView = true;
        $scope.class = "";
        $scope.showCategoryData();
        $scope.showSegmentData();
      }
      else{
        $scope.mainView = false;
        $scope.class = string;
        $scope.showCategoryData("","","",option_id,string);
        $scope.showSegmentData("","","",option_id,string);
      }
    };

    $scope.onClick = function(option_id,string){
      $scope.string = string;
      $scope.option_id = option_id;
      $scope.onOptionSelect(string,option_id);
    };

    $scope.open = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'dashboard/category-performance-analysis/category-modal.tpl.html',
        controller: 'CategoryModalCtrl',
        size: 900,
        resolve: {
          option_id: function () {
            return $scope.option_id;
          },
          string: function () {
            return $scope.string;
          },
          start_date: function () {
            return $scope.start_date;
          },
          end_date: function () {
            return $scope.end_date;
          }
        }
      });
    };

    resetDates();
    $scope.showCategoryData();
    $scope.showSegmentData();

  });
})();