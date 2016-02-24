(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .service('commentService', function(_, StatusEnum){
    return {
      getComment: function(comment_data){
        var data = comment_data;
        var phone_no = comment_data.user_phone == "N/A" ? ( comment_data.email == "N/A" ? "N/A" : "" ) : comment_data.user_phone;
        var email = comment_data.email == "N/A" ? "" : comment_data.email;
        //var show_dropdown = comment_data.action_taken === 1 ?  true : false;
        var action_string = StatusEnum.get_labels(comment_data.action_taken);
        var date_time = new Date(comment_data.created_at).toString().split("GMT")[0];

        return {data: data, email: email, phone_no: phone_no, action_string: action_string, date_time: date_time};
      }

    };
  });

})();