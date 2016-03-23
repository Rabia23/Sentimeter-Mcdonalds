(function() {
    angular.module('livefeed.dashboard.positive_negative_feedback')

    .controller('ModalInstanceCtrl', function ($scope, $uibModal, $uibModalInstance, text, Graphs, commentService, StatusEnum, flashService) {

      $scope.comments = [];
      $scope.page = 1;

      $scope.lock = true;
      $scope.show_loader = false;
      $scope.modal_opened = false;

      $scope.is_last_page = false;

      $scope.text = text;

      $scope.statusOption = "All";
      $scope.status_options = StatusEnum.get_status_options();

      $scope.selectedValue = function(value, comment){
        var modalInstance = $uibModal.open({
          templateUrl: 'dashboard/positive-negative-feedback/view-comment-modal.tpl.html',
          controller: 'AddCommentModalCtrl',
          windowClass: 'modal commentModal',
          size: 600,
          resolve: {
            comment: function () {
              return comment;
            },
            status_id: function() {
              return value;
            }
          }
        });
      };

      $scope.showComments = function(option, text){
        $scope.statusOption = option;
        $scope.page = 1;
        var status_id = StatusEnum.get_index(option);
        if($scope.modal_opened){
          $scope.show_loader = true;
        }
        if($scope.text){
          Graphs.comments_text_search($scope.page, status_id, $scope.text).$promise.then(function(data){
            $scope.show_loader = false;
            if(data.response.feedback_count === 0){
              $scope.lock = false;
              $scope.comments = [];
            }
            else{
              showCommentsFunction(data);
            }
          });
        }
        else{
          Graphs.comments($scope.page, status_id).$promise.then(function(data){
            $scope.show_loader = false;
            showCommentsFunction(data);
          });
        }
        $scope.modal_opened = true;
      };

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

      $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.showComments($scope.statusOption, text);

      $scope.openComment = function (text) {
        console.log(" in open comment function..");
        var modalInstance = $uibModal.open({
          templateUrl: 'dashboard/positive-negative-feedback/view-comment-modal.tpl.html',
          controller: 'ViewCommentModalCtrl',
          windowClass: 'modal commentModal',
          size: 600,
          resolve: {
          }
        });
      };
    });

})();