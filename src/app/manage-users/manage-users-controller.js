(function() {
  angular.module( 'livefeed.manage_users')


  .controller( 'ManageUsersCtrl', function ManageUsersCtrl( $scope, $state, $rootScope, TokenHandler, Auth, $uibModal, Api, Enum) {

    if (Auth.is_logged_in()) {
      $rootScope.show_username = true;
      $rootScope.username = TokenHandler.get_username();
    }
    $rootScope.logout = function(){
      Auth.is_logged_out();
      $rootScope.show_username = false;
      $state.go('login');
    };

    var parent_id;
    var child_role;

    Api.manage_users().$promise.then(function(data){
      console.log(data);
      $scope.user_list = Enum.get_user_label(data.child_role);
      $scope.users = data.children;
      parent_id = data.parent_id;
      child_role = data.child_role;
    });

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        templateUrl: 'manage-users/edit-user-modal.tpl.html',
        controller: 'ModalInstanceCtrl',
        size: 1200,
        resolve: {
          parent_id: function () {
            return parent_id;
          },
          child_role: function(){
            return child_role;
          }
        }
      });

      modalInstance.result.then(function (user) {
        $scope.users.push(user);
      });
    };

  });

})();