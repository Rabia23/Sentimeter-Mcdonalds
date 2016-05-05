angular.module( 'livefeed.reports.api', [
  'ngResource',
  'livefeed.api_links'
])

.factory('ReportsApi', ['$resource','apiLinks', function($resource, apiLinks) {



  function ReportsApi() {
    this.service = $resource(apiLinks.link.api, {},
    {
      promotions_list: {method: "GET",isArray: false, params: {endpoint: "promotion"}},
      promotion_detail: {method: "GET",isArray: false, params: {endpoint: "promotion_detail"}}
    });
  }
  ReportsApi.prototype.promotions_list = function(){
    return this.service.promotions_list();
  };
  ReportsApi.prototype.promotion_detail = function(id, date_from, date_to){
    return this.service.promotion_detail({id: id, date_from: date_from, date_to: date_to});
  };
  return new ReportsApi();
}]);
