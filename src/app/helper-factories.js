angular.module( 'helper_factories', [])

.factory('Global', function() {

  return {

    liveQscClass: {
      "Workplace": "item3",
      "Culture": "",
      "Food": "item2"
    },

    liveQscPriority: {
      "Workplace": 3,
      "Culture": 1,
      "Food": 2
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
