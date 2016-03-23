angular.module( 'helper_factories', ['ngResource'])

.factory('Global', [ '_', function(_) {

  return {


    topConcernsColors: function(index){
      var colors = [ "#cb1e24","#178aea","#434347","#f1d400","#90ec7c"];
      return colors[index];
    },

    questionnaireDonutColors: function(index){
      var colors = [ "#f7ca17","#e84c3d"];
      return colors[index];
    },

    opportunityClass: {
      "Quality of Food": [1, "#4CCC72"],
      "Friendly & Courteous Staff": [2, "#3598DC"],
      "Clean Restaurant": [3, "#E74D3D"],
      "Variety in Menu": [4, "#F0C547"],
      "Special Promotions": [5,"#9C59B8"]
    },

    opportunityPriority: {
      "Quality of Food": 1,
      "Friendly & Courteous Staff": 2,
      "Clean Restaurant": 3,
      "Variety in Menu": 4,
      "Special Promotions": 5
    },

    questionnaireBarChartClass: {
      "Weekly": [3, "#4CCC72"],
      "Very Rare": [1, "#3598DC"],
      "Daily": [2, "#9C59B8"],
      "Monthly": [4, "#34495E"]
    },

    promotionBarChartClass: {
      "Fliers": [1, "#4CCC72"],
      "Restaurants": [2, "#3598DC"],
      "Billboards": [3, "#9C59B8"],
      "Digital": [4, "#34495E"],
      "Radio": [5, "#F0C547"],
      "Print": [6, "#E74D3D"]
    },

    promotionPieChartColorScheme: {
      "Yes": "#f7ca17",
      "No": "#e84c3d"
    },

    promotionPieChartPriority: {
      "Yes": 1,
      "No": 2
    },

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

    mainRatingColorScheme: {
      "Few concerns": '#e73a3a',
      "Not happy enough": '#ac1a1a',
      "Everything on track": '#01ad0f',
      "I'm lovin' it": '#0E590A'

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
    },

    overallFeedbackColumn:{
      ranges: [_.range(0,15), _.range(15,30), _.range(30, 45), _.range(45, 60), _.range(60, 75), _.range(75,101)]
    }

  };

}]);
