(function() {
  angular.module( 'livefeed.live', [
    'ui.router',
    'livefeed.authService',
    'livefeed.live.api',
    'helper_factories',
    'livefeed.live.top_concerns',
    'livefeed.live.overall-ratings',
    'livefeed.live.business_segment',
    'livefeed.live.qsc',
    'livefeed.live.patch_qsc_analysis',
    'livefeed.live.leader_board',
    'livefeed.live.strength'
  ]);

})();