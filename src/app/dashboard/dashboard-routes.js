(function() {
    angular.module('livefeed.dashboard')

    .config(function config( $stateProvider ) {
      $stateProvider
      .state( 'dashboard', {
        url: '/dashboard',
        views: {
          "": {
            controller: 'DashboardCtrl',
            templateUrl: 'dashboard/dashboard.tpl.html'
          },
          "feedback_map@dashboard":{
            controller: "FeedbackMapCtrl",
            templateUrl: 'dashboard/feedback-map/feedback-map.tpl.html'
          },
          "sidebar@dashboard":{
            templateUrl: 'common/sidebar.tpl.html'
          },
          "header@dashboard":{
            templateUrl: 'common/header.tpl.html'
          },
          "footer@dashboard":{
            templateUrl: 'common/footer.tpl.html'
          },
          "category_performance_analysis@dashboard":{
            controller: "CategoryPerformanceAnalysisCtrl",
            templateUrl: 'dashboard/category-performance-analysis/category-performance-analysis.tpl.html'
          },
          "regional_analysis@dashboard":{
            controller: "RegionalAnalysisCtrl",
            templateUrl: 'dashboard/regional-analysis/regional-analysis.tpl.html'
          },
          "overall_rating@dashboard":{
            controller: "TimeLineCtrl",
            templateUrl: 'dashboard/overall-rating/overall-rating.tpl.html'
          },
          "overall_feedback@dashboard":{
            controller: "OverallFeedbackCtrl",
            templateUrl: 'dashboard/overall-feedback/overall-feedback.tpl.html'
          },
          "statistics@dashboard":{
            controller: "StatisticsCtrl",
            templateUrl: 'dashboard/statistics/statistics.tpl.html'
          },
          "positive_negative_feedback@dashboard":{
            controller: "PositiveNegativeFeedbackCtrl",
            templateUrl: 'dashboard/positive-negative-feedback/positive-negative-feedback.tpl.html'
          },

          "top_concern@dashboard":{
            controller: "TopConcernsCtrl",
            templateUrl: 'dashboard/top-concern/top-concern.tpl.html'
          },

          "opportunities@dashboard":{
            controller: "OpportunitiesCtrl",
            templateUrl: 'dashboard/opportunities/opportunities.tpl.html'
          }

        },
        authenticate: true
      });

    });
})();