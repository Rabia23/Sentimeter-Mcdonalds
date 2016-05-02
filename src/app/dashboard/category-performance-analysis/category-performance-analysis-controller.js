(function() {
  angular.module( 'livefeed.dashboard.category_performance_analysis')

  .controller('CategoryPerformanceAnalysisCtrl', function CategoryPerformanceAnalysisCtrl($rootScope, $scope, feedbackService, CategoryPerformanceApi, flashService, $uibModal) {

    $scope.show_loading = false;
    $scope.class = '';
    $scope.today = new Date();
    $scope.mainView = true;
    var category_performance_array = [];
    var option_id = null;
    var string = 'All';
    var start_date = null;
    var end_date = null;


    resetDates();
    showCategoryData();
    showSegmentData();


    function resetDates(){
      $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
      };
    }

    $scope.datePickerOption = {
      eventHandlers: {
        'apply.daterangepicker': function(ev, picker){
          start_date = ev.model.startDate._i;
          end_date =  ev.model.endDate._i;
          showCategoryData("","","",option_id,$scope.class);
          showSegmentData("","","",option_id,$scope.class);
        }
      },
      opens: "left"
    };

    function showCategoryData(region_id,city_id,branch_id,option_id,string){
      category_performance_array = [];
      $scope.show_loading = true;
      CategoryPerformanceApi.category_performance(region_id,city_id,branch_id,option_id, start_date, end_date).$promise.then(function(performance_data){
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

          if (option_id == null) {
            $scope.labels = $scope.category_data;
          }
        }
        else{
          flashService.createFlash(performance_data.message, "danger");
        }
      });
    }

    function showSegmentData(region_id,city_id,branch_id,option_id,string) {
      CategoryPerformanceApi.segmentation_rating(region_id, city_id, branch_id, option_id, start_date, end_date).$promise.then(function (segment_data) {
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
          _.each($rootScope.chartInstances, function(chart) {
            chart.destroy();
          });
          $rootScope.chartInstances = [];
          $scope.segments = [];
          $scope.segments = _.map(segment_data.response.segments, function (data) {
            return feedbackService.getSegmentFeedbacks(data, option_id, string);
          });
          $scope.show_loading = false;
        }
        else{
          flashService.createFlash(segment_data.message, "danger");
        }
      });
    }


    $scope.onOptionSelect = function(string,option_id){
      if(string === 'All'){
        $scope.mainView = true;
        $scope.class = "";
        showCategoryData();
        showSegmentData();
      }
      else{
        $scope.mainView = false;
        $scope.class = string;
        showCategoryData("","","",option_id,string);
        showSegmentData("","","",option_id,string);
      }
    };

    $scope.onClick = function(label_object){
      if(label_object){
        string = label_object.name;
        option_id = label_object.id;
      }
      else{
        string = 'All';
        option_id = null;
      }
      $scope.onOptionSelect(string, option_id);
    };

    $scope.open = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'dashboard/category-performance-analysis/category-modal.tpl.html',
        controller: 'CategoryModalCtrl',
        size: 900,
        resolve: {
          option_id: function () {
            return option_id;
          },
          string: function () {
            return string;
          },
          start_date: function () {
            return start_date;
          },
          end_date: function () {
            return end_date;
          }
        }
      });
    };
  });
})();
