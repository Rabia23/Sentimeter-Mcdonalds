(function() {
  angular.module('livefeed.dashboard.age_group_analysis.api', [
    'ngResource',
    'livefeed.api_links',
    'livefeed.authService'
  ])

  .factory('AgeAnalysisApi', ['$resource', 'apiLinks', '_', 'TokenHandler', '$http', '$rootScope', function ($resource, apiLinks, _, TokenHandler, $http, $rootScope) {
    function AgeAnalysisApi() {
      this.service = $resource(apiLinks.link.api, {},
        {
          customer_analysis: {method: "GET", isArray: false, params: {endpoint: "customer_analysis"}}
        });
    }

    AgeAnalysisApi.prototype.customer_analysis = function (region_id, city_id, branch_id, start_date, end_date) {
      var token = $rootScope.token || TokenHandler.get_token();
      region_id = region_id || "";
      city_id = city_id || "";
      branch_id = branch_id || "";
      start_date = start_date || "";
      end_date = end_date || "";
      return this.service.customer_analysis({ token: token, region: region_id, city: city_id, branch: branch_id, date_from: start_date, date_to: end_date });
    };

    return new AgeAnalysisApi();
  }]);
})();
