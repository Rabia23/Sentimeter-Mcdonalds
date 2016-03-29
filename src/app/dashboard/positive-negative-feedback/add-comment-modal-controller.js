(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .controller('AddCommentModalCtrl', function ($scope, $uibModalInstance, Graphs, StatusEnum, flashService, comment, status_id) {

    $scope.show_loading = false;
    $scope.comment_text = "";
    $scope.add_comment = true;

    function action_performed(){
      comment.show_dropdown = false;
      comment.action_string = status_id;
      var action_id = StatusEnum.get_index(status_id);
      Graphs.action_taken(comment.data.id,action_id,$scope.comment_text).$promise.then(function(data){
        if(data.success) {
          comment.data.action_taken = data.response.action_taken;
          comment.data.action_comment = data.response.action_comment;
          comment.updated_time = new Date().toString(data.response.updated_at).split("GMT")[0];
          if(data.response.action_comment){
            var message = "Comment successfully added.";
            flashService.createFlash(message, "success");
          }
        }
        else {
          flashService.createFlash(data.message, "danger");
        }
      });
    }

    $scope.save = function(){
      action_performed();
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $scope.comment_text = "";
      action_performed();
      $uibModalInstance.dismiss('cancel');
    };

    $scope.evaluateChange = function(object) {
      $scope.comment_text = object.comment_text;
    };
  });

})();