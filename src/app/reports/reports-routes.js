(function() {
  angular.module( 'livefeed.reports')

  .config(function config( $stateProvider ) {
    $stateProvider
    .state( 'reports', {
      url: '/reports',
      views: {
        "": {
          controller: 'ReportsCtrl',
          templateUrl: 'reports/reports.tpl.html'
        },
        "sidebar@reports":{
          templateUrl: 'common/sidebar.tpl.html'
        },

        "header@reports":{
          templateUrl: 'common/header.tpl.html'
        },

        "footer@reports":{
          templateUrl: 'common/footer.tpl.html'
        }

      },
      authenticate: true
    });

  });

})();
