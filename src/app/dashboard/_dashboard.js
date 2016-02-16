(function() {
    angular.module( 'livefeed.dashboard', [
      'ui.router',
      'factories',
      'livefeed.dashboard.regional_analysis',
      'livefeed.dashboard.feedback_map',
      'livefeed.dashboard.category_performance_analysis',
      'livefeed.dashboard.overall_rating',
      'livefeed.dashboard.overall_feedback',
      'livefeed.dashboard.statistics',
      'livefeed.dashboard.positive_negative_feedback',
      'livefeed.dashboard.top_concern',
      'livefeed.dashboard.opportunities',
      'ngFlash',
      'livefeed.authService'

    ]);

})();