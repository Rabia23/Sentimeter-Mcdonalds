describe('QuestionnaireApi', function(){

  var QuestionnaireApi, $httpBackend, $rootScope, apiLinks;
  var apilink = 'https://stagingapimcdonalds.sentimeter.io/api/';

  beforeEach(module('livefeed.questionnaire.api'));

  beforeEach(inject(function(_$httpBackend_, _QuestionnaireApi_, _$rootScope_, _apiLinks_) {
    $httpBackend = _$httpBackend_;
    QuestionnaireApi = _QuestionnaireApi_;
    $rootScope = _$rootScope_;
    apiLinks = _apiLinks_;

  }));

  describe('questionnaire_list', function(){


    it('should get questionnaire list', function () {

      $httpBackend.expectGET(apilink + 'questionnaire')
      .respond(
        {
          response: [{
            id: 2,
            title: "Jhelum Questionnaire"
          }]
        }
      );
      var result = QuestionnaireApi.questionnaire_list();
      $httpBackend.flush();

      expect(result.response[0].title).toEqual('Jhelum Questionnaire');
    });
  });

  describe('questionnaire_detail', function(){
    it('should get questionnaire detail', function(){
      $httpBackend.expectGET(apilink + 'questionnaire_detail?date_from=01-03-2016&date_to=04-04-2016&id=2')
      .respond(
        {
          response: {
            analysis: [{
              question: "Are you from Jhelum?",
              total_count: 5,
              type: 10
            }],
            questionnaire: {
              id: 2,
              title: "Jhelum Questionnaire"
            }
          }
        }
      );

      var result = QuestionnaireApi.questionnaire_detail(2, '01-03-2016', '04-04-2016');
      $httpBackend.flush();

      expect(result.response.questionnaire.title).toEqual('Jhelum Questionnaire');
    });
  });


});
