(function() {
  angular.module( 'livefeed', [
    'templates-app',
    'templates-common',
    'livefeed.dashboard',
    'livefeed.login',
    'livefeed.how_to',
    'livefeed.live',
    'livefeed.manage_users',
    'livefeed.promotions',
    'livefeed.questionnaire',
    'livefeed.reports',
    'livefeed.authService',
    'livefeed.error_404',
    'livefeed.error_500',
    'ui.router',
    'livefeed.offline',
    'toaster'
  ]);
})();
