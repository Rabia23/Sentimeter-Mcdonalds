describe('BusinessSegmentCtrl', function(){

  var $rootScope, controller;

  beforeEach(module('livefeed.live.business_segment'));
  beforeEach(module('helper_factories'));

  beforeEach(inject(function(_$rootScope_, $controller) {

    $rootScope = _$rootScope_;
    controller = $controller('BusinessSegmentCtrl', { $scope: $rootScope });
    $rootScope.segmentation_ratings = {
      "segment_count": 5,
      "segments" : [
        {
          "feedback_count": 0,
          "option_count": 0,
          "option_data": [
            {
              "count": 0,
              "option__color_code": "#cb1e24",
              "option__text": "Workplace",
              "option_id": 8
            },
            {
              "count": 0,
              "option__color_code": "#ffd200",
              "option__text": "Culture",
              "option_id": 7
            },
            {
              "count": 0,
              "option__color_code": "#1f9aec",
              "option__text": "Food",
              "option_id": 6
            }
          ],
          "segment": "Late Night",
          "segment_end_time": "01:00"
        }
      ]
    };

  }));

  describe('business_segment method', function(){
    it('init scope arrays when function calls', function(){
      controller.business_segment();
      expect($rootScope.business_segments_labels[0].option_name).toEqual("Culture");
      expect($rootScope.segmentation_rating[0].category).toEqual("LATE NIGHT");
    });
  });

  describe('$rootScope.$on method', function(){
    it('should respond to the "live-data-received" event', function(){
      spyOn(controller, 'business_segment');
      $rootScope.$broadcast('live-data-received');
      expect(controller.business_segment).toHaveBeenCalled();
    });
  });

});
