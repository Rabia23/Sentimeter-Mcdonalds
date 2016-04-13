angular.module( 'livefeed.promotions.api', [
  'ngResource',
  'livefeed.api_links'
])

.factory('PromotionsApi', ['$resource','apiLinks', function($resource, apiLinks) {



  function PromotionsApi() {
    this.service = $resource(apiLinks.link.api, {},
    {
      promotions_list: {method: "GET",isArray: false, params: {endpoint: "promotion"}},
      promotion_detail: {method: "GET",isArray: false, params: {endpoint: "promotion_detail"}}
    });
  }
  PromotionsApi.prototype.promotions_list = function(){
    return this.service.promotions_list();
  };
  PromotionsApi.prototype.promotion_detail = function(id, date_from, date_to){
    return this.service.promotion_detail({id: id, date_from: date_from, date_to: date_to});
  };
  return new PromotionsApi();
}]);
