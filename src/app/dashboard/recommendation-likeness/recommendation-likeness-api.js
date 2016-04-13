(function() {
  angular.module('livefeed.dashboard.recommendation_likeness.api', [
    'ngResource',
    'livefeed.api_links'
  ])

  .factory('RecommendationLikenessApi', ['$resource', 'apiLinks', function ($resource, apiLinks) {
    function RecommendationLikenessApi() {
      this.service = $resource(apiLinks.link.api, {},
        {
          recommendation_analysis: {method: "GET", isArray: false, params: {endpoint: "recommendation_analysis"}}
        });
    }

    RecommendationLikenessApi.prototype.recommendation_analysis = function (region_id, city_id, branch_id, start_date, end_date) {
      region_id = region_id || "";
      city_id = city_id || "";
      branch_id = branch_id || "";
      start_date = start_date || "";
      end_date = end_date || "";
      return this.service.recommendation_analysis({ region: region_id, city: city_id, branch: branch_id, date_from: start_date, date_to: end_date });
    };

    return new RecommendationLikenessApi();
  }]);
})();
