describe('PromotionsApi', function(){

  var PromotionsApi, $httpBackend, $rootScope, apiLinks;
  var apilink = 'https://apiarbisoft.sentimeter.io/api/';
  
  beforeEach(module('livefeed.promotions.api'));

  beforeEach(inject(function(_$httpBackend_, _PromotionsApi_, _$rootScope_, _apiLinks_) {
    $httpBackend = _$httpBackend_;
    PromotionsApi = _PromotionsApi_;
    $rootScope = _$rootScope_;
    apiLinks = _apiLinks_;

  }));

  describe('#promotions_list', function(){


    it('should get promotions list', function () {

      $httpBackend.expectGET(apilink + 'promotion')
      .respond(
        {
          response: [{
            id: 1,
            title: "Black Pepper Crispy"
          }]
        }
      );
      var result = PromotionsApi.promotions_list();
      $httpBackend.flush();

      expect(result.response[0].title).toEqual('Black Pepper Crispy');
    });
  });

  describe('#promotion_detail', function(){
    it('should get promotion detail', function(){
      $httpBackend.expectGET(apilink + 'promotion_detail?date_from=12-02-2015&date_to=13-02-2015&id=1')
      .respond(
        {
          response: {
            analysis: [{
              question: 4,
              total_count: 12,
              type: 3
            }],
            promotion: {
              id: 1,
              title: "Black Pepper Crispy"
            }
          }
        }
      );

      var result = PromotionsApi.promotion_detail(1,'12-02-2015', '13-02-2015');
      $httpBackend.flush();

      expect(result.response.promotion.title).toEqual('Black Pepper Crispy');
    });
  });


});
