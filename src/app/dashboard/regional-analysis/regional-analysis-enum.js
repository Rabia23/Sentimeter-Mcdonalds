(function() {
  angular.module( 'livefeed.dashboard.regional_analysis')

  .factory('PatchStatusEnum', [function() {

    var labels = ["Unprocessed", "Unrecoverable", "Recovered", "NAN"];
    var user_role = {
      "Branch Manager": 3,
      "Operational Consultant": 4
    };

    return {

      get_index: function(value){
        return labels.indexOf(value) + 1;
      },

      get_skip_label_index: function(){
        return labels.indexOf("NAN") + 1;
      },
      get_branch_manager_value :function(){
        return user_role["Branch Manager"];
      },
      get_operational_consultant_value :function(){
        return user_role["Operational Consultant"];
      }
    };

  }]);

})();