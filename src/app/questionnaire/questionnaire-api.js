angular.module( 'livefeed.questionnaire.api', [
  'ngResource',
  'livefeed.api_links'
])

.factory('QuestionnaireApi', ['$resource','apiLinks', function($resource, apiLinks) {



  function QuestionnaireApi() {
    this.service = $resource(apiLinks.link.api, {},
    {
      questionnaire_list: {method: "GET",isArray: false, params: {endpoint: "questionnaire"}},
      questionnaire_detail: {method: "GET",isArray: false, params: {endpoint: "questionnaire_detail"}}
    });
  }
  QuestionnaireApi.prototype.questionnaire_list = function(){
    return this.service.questionnaire_list();
  };
  QuestionnaireApi.prototype.questionnaire_detail = function(id, date_from, date_to){
    date_from = date_from || "";
    date_to = date_to || "";
    return this.service.questionnaire_detail({id: id, date_from: date_from, date_to: date_to});
  };
  return new QuestionnaireApi();
}]);
