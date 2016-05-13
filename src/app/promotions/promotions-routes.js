(function() {
  angular.module( 'livefeed.promotions')

  .config(function config( $stateProvider ) {
    $stateProvider
    .state( 'promotions', {
      url: '/promotions',
      views: {
        "": {
          controller: 'PromotionsCtrl',
          templateUrl: 'promotions/promotions-list/promotions.tpl.html'
        },
        "sidebar@promotions":{
          templateUrl: 'common/sidebar.tpl.html'
        },

        "header@promotions":{
          templateUrl: 'common/header.tpl.html'
        },

        "footer@promotions":{
          templateUrl: 'common/footer.tpl.html'
        }

      },
      authenticate: true
    })
    .state( 'promotions_detail', {
      url: '/promotions_detail/:promotionId',
      views: {
        "": {
          controller: 'PromotionsDetailCtrl',
          templateUrl: 'promotions/promotions-detail/promotions-detail.tpl.html'
        },
        "sidebar@promotions_detail":{
          templateUrl: 'common/sidebar.tpl.html'
        },

        "header@promotions_detail":{
          templateUrl: 'common/header.tpl.html'
        },

        "footer@promotions_detail":{
          templateUrl: 'common/footer.tpl.html'
        }

      },
      authenticate: true
      // params: {
      //   promotionName: null
      // }
    });

  });

})();