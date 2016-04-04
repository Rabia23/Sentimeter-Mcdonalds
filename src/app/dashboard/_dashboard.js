(function() {
    angular.module( 'livefeed.dashboard', [
      'ui.router',
      'factories',
      'helper_factories',
      'chart.js',
      'ui.bootstrap',
      'daterangepicker',
      'livefeed.dashboard.regional_analysis',
      'livefeed.dashboard.feedback_map',
      'livefeed.dashboard.category_performance_analysis',
      'livefeed.dashboard.overall_rating',
      'livefeed.dashboard.overall_feedback',
      'livefeed.dashboard.statistics',
      'livefeed.dashboard.positive_negative_feedback',
      'livefeed.dashboard.top_concern',
      'livefeed.dashboard.opportunities',
      'livefeed.dashboard.age_group_analysis',
      'livefeed.dashboard.recommendation_likeness',
      'livefeed.authService'

    ]);

})();