angular.module( 'helper_factories', [])

.factory('Global', function() {

  return {

    liveQscClass: {
      "Cleanliness": "item3",
      "Quality": "",
      "Service": "item2"
    },

    liveQscPriority: {
      "Cleanliness": 3,
      "Quality": 1,
      "Service": 2
    },

    complaintAnalysisAction: {
      1: ["Unprocessed", "#cb1e24"],
      2: ["Unrecoverable", "#ffd200"],
      3: ["Recovered", "#01c211"],
      4: ["No Action Needed", "#01c211"]
    },

    liveComplaintAnalysisActionPriority: {
      "Unprocessed": 1,
      "Recovered": 3,
      "Unrecoverable": 2
    },

    liveComplaintAnalysisActionClass: {
      1: "",
      2: "item2",
      3: "processed"
    }
  };

});
