(function() {
  angular.module( 'livefeed.dashboard.positive_negative_feedback')

  .factory('StatusEnum', [function() {
    var statusOptions = ["All", "Unprocessed", "Unrecoverable", "Recovered", "NAN"];
    var StatusObject = {
      labels: ["Unprocessed", "Unrecoverable", "Recovered", "NAN"],
      positiveDefault: "NAN",
      negativeDefault: "Unprocessed"
    };


    return {
      get_labels: function(index){
        return StatusObject.labels[index - 1];
      },
      get_index: function(value){
        return StatusObject.labels.indexOf(value) + 1;
      },
      get_positive_default: function(){
        return StatusObject.positiveDefault;
      },
      get_negative_default: function(){
        return StatusObject.negativeDefault;
      },
      get_status_options: function(){
        return statusOptions;
      }
    };

  }]);

})();