(function() {
    angular.module('livefeed.dashboard.positive_negative_feedback')

    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, text, Graphs, commentService, StatusEnum, flashService) {

      $scope.comments = [];
      $scope.page = 1;

      $scope.lock = true;

      $scope.show_error_message = false;

      $scope.is_last_page = false;

      $scope.text = text;

      $scope.statusOption = "All";
      $scope.status_options = StatusEnum.get_status_options();

      $scope.selectedValue = function(value, comment){
        comment.show_dropdown = false;
        comment.action_string = value;
        var action_id = StatusEnum.get_index(value);
        Graphs.action_taken(comment.data.id,action_id).$promise.then(function(data){
          if(data.success) {
            $scope.show_error_message = false;
            comment.data.action_taken = data.response.action_taken;
            comment.updated_time = new Date().toString(data.response.updated_at).split("GMT")[0];
          }
          else {
           $scope.show_error_message = true;
           $scope.error_message = data.message;
           flashService.createFlash($scope.error_message, "danger");
          }
        });
      };


      $scope.showComments = function(option, text){
        $scope.statusOption = option;
        $scope.page = 1;
        var status_id = StatusEnum.get_index(option);
        if(text){
          Graphs.comments_text_search($scope.page, status_id, text).$promise.then(function(data){
            showCommentsFunction(data);
          });
        }
        else{
          Graphs.comments($scope.page, status_id).$promise.then(function(data){
            showCommentsFunction(data);
          });
        }

      };


      function showCommentsFunction(data){
        $scope.lock = false;
        $scope.is_last_page = data.response.is_last_page;
        if(data.success) {
          $scope.show_error_message = false;
          $scope.comments = _.map(data.response.feedbacks, function (data) {
            return commentService.getComment(data);
          });
        }
        else {
         $scope.show_error_message = true;
         $scope.error_message = data.message;
         flashService.createFlash($scope.error_message, "danger");
        }
      }

      function showGetMoreFunction(data){
        $scope.is_last_page = data.response.is_last_page;
        if(data.success) {
          $scope.show_error_message = false;
          $scope.lock = false;
          angular.forEach(data.response.feedbacks, function (value, key) {
            var comment_data = commentService.getComment(value);
            $scope.comments.push(comment_data);
          });
        }
        else {
         $scope.show_error_message = true;
         $scope.error_message = data.message;
         flashService.createFlash($scope.error_message, "danger");
        }
      }

      $scope.getMoreComments = function(option, text){
        var status_id = StatusEnum.get_index(option);
        var show_dropdown, action_string;
        if(!$scope.is_last_page){
          $scope.page = $scope.page + 1;
          $scope.lock = true;
          if(text){
            Graphs.comments_text_search($scope.page, status_id, text).$promise.then(function(data){
              showGetMoreFunction(data);
            });
          }
          else{
            Graphs.comments($scope.page,status_id, text).$promise.then(function(data){
              showGetMoreFunction(data);
            });
          }
         
        }
      };

      $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.showComments($scope.statusOption, text);
    });

})();