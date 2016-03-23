(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .controller('AddCommentModalCtrl', function ($scope, $uibModalInstance, Graphs, StatusEnum, flashService, comment, status_id) {

    $scope.show_loading = false;
    $scope.comment = "";
    $scope.add_comment = true;

    $scope.save = function(){
      comment.show_dropdown = false;
      comment.action_string = status_id;
      var action_id = StatusEnum.get_index(status_id);
      Graphs.action_taken(comment.data.id,action_id).$promise.then(function(data){
        if(data.success) {
          comment.data.action_taken = data.response.action_taken;
          comment.updated_time = new Date().toString(data.response.updated_at).split("GMT")[0];
        }
        else {
         flashService.createFlash(data.message, "danger");
        }
      });
      var message = "Comment successfully added.";
      flashService.createFlash(message, "success");
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();