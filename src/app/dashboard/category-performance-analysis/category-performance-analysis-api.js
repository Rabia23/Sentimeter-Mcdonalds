(function() {
  angular.module('livefeed.category_performance_analysis.api', [
    'ngResource',
    'livefeed.api_links'
  ])

  .factory('CategoryPerformanceApi', ['$resource', 'apiLinks', function ($resource, apiLinks) {
    function CategoryPerformanceApi() {
      this.service = $resource(apiLinks.link.api, {},
      {
        category_performance: {method: "GET", isArray: false, params: {endpoint: "category_performance"}},
        segmentation_rating: {method: "GET", isArray: false, params: {endpoint: "segmentation_rating"}}
      });
    }

    CategoryPerformanceApi.prototype.category_performance = function (region_id, city_id, branch_id, option_id, start_date, end_date) {
      region_id = region_id || "";
      city_id = city_id || "";
      branch_id = branch_id || "";
      option_id = option_id || "";
      start_date = start_date || "";
      end_date = end_date || "";
      return this.service.category_performance({ region: region_id, city: city_id, branch: branch_id, option: option_id, date_from: start_date, date_to: end_date });
    };

    CategoryPerformanceApi.prototype.segmentation_rating = function (region_id, city_id, branch_id, option_id, start_date, end_date) {
      region_id = region_id || "";
      city_id = city_id || "";
      branch_id = branch_id || "";
      option_id = option_id || "";
      start_date = start_date || "";
      end_date = end_date || "";
      return this.service.segmentation_rating({ region: region_id, city: city_id, branch: branch_id, option: option_id, date_from: start_date, date_to: end_date });
    };

    return new CategoryPerformanceApi();
  }]);
})();
