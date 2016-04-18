describe('QscCtrl', function(){

  var $rootScope, controller;

  beforeEach(module('livefeed.live.qsc'));
  beforeEach(module('helper_factories'));

  beforeEach(inject(function(_$rootScope_, $controller) {

    $rootScope = _$rootScope_;
    controller = $controller('QscCtrl', { $scope: $rootScope });
    $rootScope.overall_ratings = [
      {
        "data":{
          "feedback_count": 0,
          "feedbacks": [
            {
              "count": 0,
              "option__color_code": "#cb1e24",
              "option__parent_id": null,
              "option__score": 0,
              "option__text": "Quality",
              "option_id": 48
            },
            {
              "count": 0,
              "option__color_code": "#ffd200",
              "option__parent_id": null,
              "option__score": 0,
              "option__text": "Service",
              "option_id": 52
            },
            {
              "count": 0,
              "option__color_code": "#1f9aec",
              "option__parent_id": null,
              "option__score": 0,
              "option__text": "Cleanliness",
              "option_id": 42
            }
          ]
        },
        "date": "2016-04-09"
      }
    ];

  }));

  describe('qscfunc method', function(){
    it('init scope arrays when function calls ', function(){
      controller.qscfunc();
      expect($rootScope.qsc_labels[0].option_name).toEqual("Quality");
      expect($rootScope.overall_rating_data[0].category).toEqual("09-04-16");
    });
  });

  describe('$rootScope.$on method', function(){
    it('should respond to the "live-data-received" event', function(){
      spyOn(controller, 'qscfunc');
      $rootScope.$broadcast('live-data-received');
      expect(controller.qscfunc).toHaveBeenCalled();
    });
  });

});
