angular.module( 'helper_factories', [])

.factory('Global', function() {

  return {

    complaintAnalysisAction: {
      1: ["Unprocessed", "#cb1e24"],
      2: ["Unrecoverable", "#ffd200"],
      3: ["Recovered", "#01c211"],
      4: ["No Action Needed", "#01c211"]
    },

    complaintAnalysisActionPriority: {
      "Unprocessed": 1,
      "Recovered": 3,
      "Unrecoverable": 2
    },

    qscClass: {
      "Cleanliness": "item3",
      "Quality": "",
      "Service": "item2"
    },

    complaintAnalysisActionClass: {
      1: "",
      2: "item2",
      3: "processed"
    },

    optionsColorScheme: {
      "Quality": '#cb1e24',
      "Service": "#ffd200",
      "Cleanliness": '#1f9aec'

    },

    optionsLineColorScheme: {
      "Quality": '#cb1e24',
      "Service": "#ffd200",
      "Cleanliness": '#1f9aec'

    },

    overallFeedbackClass: {
      "Few concerns": 'neutral',
      "Not happy enough": 'negative',
      "Everything is on track!": 'good',
      "I'm lovin' it": 'v-good'
    },

    categoryPerformanceClass: {
      "Quality": '#cb1e24',
      "Service": "#ffd200",
      "Cleanliness": '#1f9aec'
    },

    segmentationClass: {
      "Cleanliness": 'blue',
      "Quality": 'lilac',
      "Service": 'yellow'
    },

    segmentationPriority: {
      "Late Night": 1,
      "Breakfast": 2,
      "Lunch": 3,
      "Snack": 4,
      "Dinner": 5
    },

    qscPriority: {
      "Cleanliness": 3,
      "Quality": 1,
      "Service": 2
    },

    overallFeedbackPriority: {
      "Few concerns": 3,
      "Not happy enough": 4,
      "Everything is on track!": 2,
      "I'm lovin' it": 1
    }
  };

});
