angular.module( 'livefeed.promotions.api', [
  'ngResource',
  'livefeed.api_links',
  'livefeed.authService'
])

.factory('PromotionsApi', ['$resource','apiLinks','TokenHandler','$rootScope', function($resource, apiLinks, TokenHandler, $rootScope) {



  function PromotionsApi() {
    this.service = $resource(apiLinks.link.api, {},
    {
      promotions_list: {method: "GET",isArray: false, params: {endpoint: "promotion"}},
      promotion_detail: {method: "GET",isArray: false, params: {endpoint: "promotion_detail"}}
    });
  }
  PromotionsApi.prototype.promotions_list = function(){
    var token = $rootScope.token || TokenHandler.get_token();
    return this.service.promotions_list({token: token});
  };
  PromotionsApi.prototype.promotion_detail = function(id, date_from, date_to){
    var token = $rootScope.token || TokenHandler.get_token();
    return this.service.promotion_detail({id: id, token: token, date_from: date_from, date_to: date_to});
  };
  return new PromotionsApi();
}]);
