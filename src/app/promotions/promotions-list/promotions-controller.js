(function() {
  angular.module( 'livefeed.promotions')


  .controller( 'PromotionsCtrl', function PromotionCtrl( $scope, $state, $rootScope, flashService, PromotionsApi) {
    
    $scope.show_loading = true;
    $rootScope.page_heading = "Promotions";


    PromotionsApi.promotions_list().$promise.then(function(data){
      $scope.show_loading = false;
      if(data.success){
        $scope.promotions = data.response;
      }
      else{
        flashService.createFlash(data.message, "danger");
      }
    });

    $scope.detail = function(promotion_id){
      $state.go("promotions_detail", {promotionId: promotion_id});
    };
  });

})();
