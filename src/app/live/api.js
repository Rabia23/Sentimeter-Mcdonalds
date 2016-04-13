(function() {
  angular.module( 'livefeed.live.api', [
    'ngResource',
    'livefeed.api_links'
  ])

  .factory('Api', ['$resource','apiLinks',  function($resource, apiLinks) {

    function Api() {
      this.service = $resource(apiLinks.link.api, {},
      {
        live_dashboard: {method: "GET", isArray: false, params:{endpoint: "livedashboard"}}

      });
    }

    Api.prototype.live_dashboard = function(){
      return this.service.live_dashboard();
    };

    return new Api();
  }]);
})();
