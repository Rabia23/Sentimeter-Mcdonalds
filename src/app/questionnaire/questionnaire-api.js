angular.module( 'livefeed.questionnaire.api', [
  'ngResource',
  'livefeed.api_links',
  'livefeed.authService'
])

.factory('QuestionnaireApi', ['$resource','apiLinks','TokenHandler','$rootScope', function($resource, apiLinks, TokenHandler, $rootScope) {



  function QuestionnaireApi() {
    this.service = $resource(apiLinks.staging, {},
                  {
                    questionnaire_list: {method: "GET",isArray: false, params: {endpoint: "questionnaire"}},
                    questionnaire_detail: {method: "GET",isArray: false, params: {endpoint: "questionnaire_detail"}}
                 });
  }
  QuestionnaireApi.prototype.questionnaire_list = function(){
    var token = $rootScope.token || TokenHandler.get_token();
    return this.service.questionnaire_list({token: token});
  };
  QuestionnaireApi.prototype.questionnaire_detail = function(id, date_from, date_to){
    var token = $rootScope.token || TokenHandler.get_token();
    date_from = date_from || "";
    date_to = date_to || "";
    return this.service.questionnaire_detail({id: id, token: token, date_from: date_from, date_to: date_to});
  };
  return new QuestionnaireApi();
}]);
