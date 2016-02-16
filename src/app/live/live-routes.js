(function() {
  angular.module( 'livefeed.live')
  .config(function config( $stateProvider ) {
    $stateProvider
    .state( 'live', {
      url: '/live',
      views: {
        "": {
          controller: 'LiveCtrl',
          templateUrl: 'live/live.tpl.html'
        },
        "top_concern@live":{
          controller: "TopConcernCtrl",
          templateUrl: 'live/top-concerns/top-concern.tpl.html'
        },
        "overall_rating@live":{
          controller: "OverallRatingCtrl",
          templateUrl: 'live/overall-ratings/overall-rating.tpl.html'
        },
        "business_segment@live":{
          controller: "BusinessSegmentCtrl",
          templateUrl: 'live/business-segments/business-segment.tpl.html'
        },
        "qsc@live":{
          controller: "QscCtrl",
          templateUrl: 'live/qsc/qsc.tpl.html'
        },
        "patch_qsc_analysis@live":{
          controller: "PatchQscAnalysisCtrl",
          templateUrl: 'live/patch-qsc-analysis/patch-qsc-analysis.tpl.html'
        },
        "benchmark_map@live":{
          controller: "BenchmarkMapCtrl",
          templateUrl: 'live/benchmark-map/benchmark-map.tpl.html'
        },
        "strength@live":{
          controller: "StrengthCtrl",
          templateUrl: 'live/strength/strength.tpl.html'
        }
      },
      authenticate: true
    });

  });

})();