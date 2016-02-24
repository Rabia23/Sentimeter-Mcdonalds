(function() {
  angular.module( 'livefeed.dashboard.positive_negative_feedback')

  .factory('StatusEnum', [function() {

    var labels = ["Unprocessed", "Unrecoverable", "Recovered", "NAN"];

    var negativeOptions = ["Unprocessed", "Unrecoverable", "Recovered"];
    var positiveOptions = ["Recovered", "NAN"];

    return {
      get_labels: function(index){
        return labels[index - 1];
      },
      get_negativeOptions: function(index){
        return negativeOptions;
      },

      get_positiveOptions: function(index){
        return positiveOptions;
      },

      get_index: function(value){
        return labels.indexOf(value) + 1;
      }
    };

  }]);

})();