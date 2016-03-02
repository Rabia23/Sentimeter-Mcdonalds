(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .service('commentService', function(_, StatusEnum){

    function showDropdown(comment_data, action_string){
      
      if(comment_data.is_negative){
        return (action_string == StatusEnum.get_negative_default());
      }
      else{
        return (action_string == StatusEnum.get_positive_default());
      }
    }

    return {
      getComment: function(comment_data){
        var data = comment_data;
        var phone_no = comment_data.user_phone == "N/A" ? ( comment_data.email == "N/A" ? "N/A" : "" ) : comment_data.user_phone;
        var email = comment_data.email == "N/A" ? "" : comment_data.email;
        var action_string = StatusEnum.get_labels(comment_data.action_taken);
        var show_dropdown = showDropdown(comment_data, action_string);
        var date_time = new Date(comment_data.created_at).toString().split("GMT")[0];
        var updated_time = new Date(comment_data.updated_at).toString().split("GMT")[0];

        return {data: data, email: email, phone_no: phone_no, show_dropdown:show_dropdown, action_string: action_string, date_time: date_time, updated_time: updated_time};
      }

    };
  });

})();