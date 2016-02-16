(function() {
    angular.module('livefeed.dashboard.positive_negative_feedback')

    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, Graphs, commentService, Flash) {

      $scope.comments = [];
      $scope.page = 1;

      $scope.lock = true;

      $scope.show_error_message = false;

      $scope.is_last_page = false;

      $scope.selectedValue = function(value, comment){
        comment.show_dropdown = false;
        comment.action_string = value == "Process" ? "Processed" : "Deferred";
        var action_id = value == "Process" ? 2 : 3;
        Graphs.action_taken(comment.data.id,action_id).$promise.then(function(data){
          if(data.success) {
            $scope.show_error_message = false;
            comment.data.action_taken = data.response.action_taken;
          }
          else {
           $scope.show_error_message = true;
           $scope.error_message = data.message;
           flashService.createFlash($scope.error_message, "danger");
          }
        });
      };



      Graphs.comments($scope.page).$promise.then(function(data){
        console.log(data);
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
      });

      $scope.getMoreComments = function(){
        var show_dropdown, action_string;
        if(!$scope.is_last_page){
          $scope.page = $scope.page + 1;
          $scope.lock = true;
          Graphs.comments($scope.page).$promise.then(function(data){
            console.log(data);
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
          });
        }
      };

      $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    });

})();