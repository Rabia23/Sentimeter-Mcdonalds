(function() {
  angular.module( 'livefeed.live.patch_qsc_analysis')

  .factory('ComplaintStatusEnum', [function() {

    var labels = ["Unprocessed", "Unrecoverable", "Recovered", "NAN"];

    return {

      get_index: function(value){
        return labels.indexOf(value) + 1;
      },

      get_skip_label_index: function(){
        return labels.indexOf("NAN") + 1;
      }
    };

  }]);

})();