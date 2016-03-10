(function() {
  angular.module( 'livefeed.dashboard.category_performance_analysis')

  .controller('CategoryPerformanceAnalysisCtrl', function CategoryPerformanceAnalysisCtrl($scope, Global, feedbackService, CategoryPerformanceApi, $timeout, flashService, $uibModal) {

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
      $scope.show_loading = true;
      CategoryPerformanceApi.category_performance(region_id,city_id,branch_id,option_id, $scope.start_date, $scope.end_date).$promise.then(function(performance_data){
        if(performance_data.success) {
          $scope.show_error_message = false;
          $scope.category_data = _.map(performance_data.response.feedbacks, function (data) {
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
          $scope.show_error_message = true;
          $scope.error_message = performance_data.message;
          flashService.createFlash($scope.error_message, "danger");
        }
      });
    };

    $scope.showSegmentData = function(region_id,city_id,branch_id,option_id,string) {
      CategoryPerformanceApi.segmentation_rating(region_id, city_id, branch_id, option_id, $scope.start_date, $scope.end_date).$promise.then(function (segment_data) {
        if(segment_data.success) {
          $scope.show_error_message = false;
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
          $scope.show_error_message = true;
          $scope.error_message = segment_data.message;
          flashService.createFlash($scope.error_message, "danger");
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