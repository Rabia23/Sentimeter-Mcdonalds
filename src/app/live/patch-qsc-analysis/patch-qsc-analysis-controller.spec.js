describe('PatchQscAnalysisCtrl', function(){

  var $rootScope, controller;

  beforeEach(module('livefeed.live.patch_qsc_analysis'));
  beforeEach(module('helper_factories'));

  beforeEach(inject(function(_$rootScope_, $controller) {

    $rootScope = _$rootScope_;
    controller = $controller('PatchQscAnalysisCtrl', { $scope: $rootScope });
    $rootScope.complaint_view = [
      {
        "data": {
          "action_analysis": [
            {
              "action_taken": 1,
              "count": 4
            },
            {
              "action_taken": 3,
              "count": 0
            },
            {
              "action_taken": 2,
              "count": 0
            }
          ]
        },
        "object": {
          "id": "",
          "name": "Pakistan",
          "objectId": ""
        }
      },
      {
        "data": {
          "action_analysis": [
            {
              "action_taken": 1,
              "count": 0
            },
            {
              "action_taken": 3,
              "count": 0
            },
            {
              "action_taken": 2,
              "count": 0
            }
          ],
          "feedback_count": 0
        },
        "object": {
          "id": 1,
          "name": "South"
        }
      },
      {
        "data": {
          "action_analysis": [
            {
              "action_taken": 1,
              "count": 6
            },
            {
              "action_taken": 3,
              "count": 0
            },
            {
              "action_taken": 2,
              "count": 0
            }
          ],
          "feedback_count": 6
        },
        "object": {
          "id": 2,
          "name": "North"
        }
      }
    ];

  }));

  describe('patch_qsc_analysis method', function(){
    it('init scope arrays when function calls ', function(){
      controller.patch_qsc_analysis();
      expect($rootScope.pakistan_analysis[0].category).toEqual("Unprocessed");
      expect($rootScope.north_analysis[0].category).toEqual("NORTH");
      expect($rootScope.south_analysis[0].category).toEqual("SOUTH");
      expect($rootScope.north_south_percentage[0].category).toEqual("NORTH");
      expect($rootScope.patch_qsc_labels[0].action_name).toEqual("Unprocessed");
    });
  });

  describe('region_data method', function(){
    it('returns data of specific region when function calls', function(){
      expect(controller.region_data($rootScope.complaint_view[2].data.action_analysis)).toEqual({ "Unprocessed": 6, "Recovered": 0, "Unrecoverable": 0 });
    });
  });

  describe('$rootScope.$on method', function(){
    it('should respond to the "live-data-received" event', function(){
      spyOn(controller, 'patch_qsc_analysis');
      $rootScope.$broadcast('live-data-received');
      expect(controller.patch_qsc_analysis).toHaveBeenCalled();
    });
  });

});
