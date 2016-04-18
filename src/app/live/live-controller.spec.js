describe('LiveCtrl', function(){

  var $rootScope, controller, WebSocket, $timeout, $httpBackend, Clock;
  var apiLink = 'https://stagingapimcdonalds.sentimeter.io/api/livedashboard';

  beforeEach(module('livefeed.live'));
  beforeEach(module('helper_factories'));
  beforeEach(module('livefeed.live.api'));

  beforeEach(inject(function(_$rootScope_, $controller, _WebSocket_, _$timeout_, _$httpBackend_, _Clock_) {

    $rootScope = _$rootScope_;
    controller = $controller('LiveCtrl', { $scope: $rootScope });
    WebSocket = _WebSocket_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
    Clock = _Clock_;

    mockResponse = {
      "message": null,
      "response": {
        "segmentation_rating": {
          "segments": [
            {
              "segment": "Late Night",
              "segment_end_time": "01:00",
              "option_count": 0,
              "feedback_count": 0,
              "option_data": [
                {
                  "option_id": 48,
                  "option__text": "Quality",
                  "option__color_code": "#cb1e24",
                  "count": 0
                },
                {
                  "option_id": 52,
                  "option__text": "Service",
                  "option__color_code": "#ffd200",
                  "count": 0
                },
                {
                  "option_id": 42,
                  "option__text": "Cleanliness",
                  "option__color_code": "#1f9aec",
                  "count": 0
                }
              ]
            }
          ],
          "segment_count": 5
        },
        "complaint_view": [
          {
            "object": {
              "id": "",
              "objectId": "",
              "name": "Pakistan"
            },
            "data": {
              "feedback_count": 63,
              "action_analysis": [
                {
                  "count": 3,
                  "action_taken": 2
                },
                {
                  "count": 41,
                  "action_taken": 1
                },
                {
                  "count": 19,
                  "action_taken": 3
                },
                {
                  "count": 0,
                  "action_taken": 4
                }
              ]
            }
          },
          {
            "object": {
              "id": 1,
              "name": "South"
            },
            "data": {
              "feedback_count": 0,
              "action_analysis": [
                {
                  "count": 0,
                  "action_taken": 1
                },
                {
                  "count": 0,
                  "action_taken": 3
                },
                {
                  "count": 0,
                  "action_taken": 2
                },
                {
                  "count": 0,
                  "action_taken": 4
                }
              ]
            }
          },
          {
            "object": {
              "id": 2,
              "name": "North"
            },
            "data": {
              "feedback_count": 63,
              "action_analysis": [
                {
                  "count": 3,
                  "action_taken": 2
                },
                {
                  "count": 41,
                  "action_taken": 1
                },
                {
                  "count": 19,
                  "action_taken": 3
                },
                {
                  "count": 0,
                  "action_taken": 4
                }
              ]
            }
          }
        ],
        "leaderboard_view": {
          "branches": [
            {
              "branch": {
                "branch_id": 1,
                "branch_name": "River Jhelum"
              },
              "count": 62
            }
          ]
        },
        "strength": {
          "feedback_count": 99,
          "feedbacks": [
            {
              "option__text": "Quality of Food",
              "option__parent_id": null,
              "option__color_code": null,
              "option_id": 37,
              "count": 19,
              "option__score": 0
            }
          ]
        },
        "overall_rating": [
          {
            "date": "2016-04-09",
            "data": {
              "feedback_count": 0,
              "feedbacks": [
                {
                  "option__text": "Quality",
                  "option__parent_id": null,
                  "count": 0,
                  "option__color_code": "#cb1e24",
                  "option_id": 48,
                  "option__score": 0
                },
                {
                  "option__text": "Service",
                  "option__parent_id": null,
                  "count": 0,
                  "option__color_code": "#ffd200",
                  "option_id": 52,
                  "option__score": 0
                },
                {
                  "option__text": "Cleanliness",
                  "option__parent_id": null,
                  "count": 0,
                  "option__color_code": "#1f9aec",
                  "option_id": 42,
                  "option__score": 0
                }
              ]
            }
          }
        ],
        "concerns": {
          "concern_count": 5,
          "concern_list": [
            {
              "weight": 37,
              "id": 1,
              "name": "Bun"
            },
            {
              "weight": 37,
              "id": 24,
              "name": "Wifi"
            }
          ]
        },
        "overall_feedback": {
          "feedback_count": 63,
          "feedbacks": [
            {
              "option__text": "I'm lovin' it",
              "option__parent_id": null,
              "option__color_code": null,
              "option_id": 57,
              "count": 2,
              "option__score": 4
            }
          ]
        },
        "top_rankings": {
          "positive_negative_feedback": {
            "positive_feedback_count": 4,
            "negative_feedback_count": 59
          },
          "top_segment": {
            "segment": "Lunch",
            "segment_end_time": "10:00",
            "option_count": 62
          },
          "qsc_count": [
          {
            "option_id": 52,
            "option__text": "Service",
            "count": 49
          },
          {
            "option_id": 48,
            "option__text": "Quality",
            "count": 55
          },
          {
            "option_id": 42,
            "option__text": "Cleanliness",
            "count": 36
          }
        ],
        "overall_experience": {
          "option__id": 60,
          "option__text": "Not happy enough",
          "count": 42
        }
      }
      },
      "success": true
    };
    $rootScope.top_ranking = {
      "positive_negative_feedback": {
        "positive_feedback_count": 4,
        "negative_feedback_count": 59
      },
      "top_segment": {
        "segment": "Lunch",
        "segment_end_time": "10:00",
        "option_count": 62
      },
      "qsc_count": [
        {
          "option_id": 52,
          "option__text": "Service",
          "count": 49
        },
        {
          "option_id": 48,
          "option__text": "Quality",
          "count": 55
        },
        {
          "option_id": 42,
          "option__text": "Cleanliness",
          "count": 36
        }
      ],
      "overall_experience": {
        "option__id": 60,
        "option__text": "Not happy enough",
        "count": 42
      }
    };

    $httpBackend.whenGET(apiLink).respond(mockResponse);

  }));

  describe('app-online', function(){
    it('should respond to the "app-online" event', function(){
      spyOn(WebSocket, 'init');
      spyOn(controller, 'live_dashboard');
      $rootScope.$broadcast('app-online');
      expect(WebSocket.init).toHaveBeenCalled();
      $timeout.flush();
      expect(controller.live_dashboard).toHaveBeenCalled();
    });
  });

  describe('app-offline', function(){
    it('should respond to the "app-offline" event', function(){
      spyOn(WebSocket, 'close_socket');
      $rootScope.$broadcast('app-offline');
      expect(WebSocket.close_socket).toHaveBeenCalled();
    });
  });

  describe('live_dashboard method', function(){
    it('init scope arrays when api call succeeds', function(){

      $httpBackend.flush();

      expect($rootScope.top_ranking.overall_experience.option__text).toEqual("Not happy enough");
      expect($rootScope.overall_ratings[0].date).toEqual("2016-04-09");
      expect($rootScope.complaint_view[0].object.name).toEqual("Pakistan");
      expect($rootScope.overall_feedback.feedbacks[0].option__text).toEqual("I'm lovin' it");
      expect($rootScope.leader_board_data.branches[0].branch.branch_name).toEqual("River Jhelum");
      expect($rootScope.segmentation_ratings.segments[0].segment).toEqual("Late Night");
      expect($rootScope.concerns.concern_list[0].name).toEqual("Bun");
      expect($rootScope.strength.feedbacks[0].option__text).toEqual("Quality of Food");
    });
  });

  describe('$rootScope.$on method', function(){
    it('should respond to the "live-data-received" event', function(){
      spyOn(controller, 'top_rankings');
      $rootScope.$broadcast('live-data-received');
      expect(controller.top_rankings).toHaveBeenCalled();
    });
  });

  describe('top_rankings method', function(){
    it('init scope array when function calls', function(){
      controller.top_rankings();
      expect($rootScope.qsc_ranking[0].option_name).toEqual("Quality");
    });
  });

  describe('display method', function(){
    it('sets date and time when function calls', function(){
      expect($rootScope.time).toBe(Clock.formatAMPM(new Date()));
      expect(controller.date_string[2]).toBe(new Date().getUTCDate().toString());
    });
  });

  describe('web-socket-close', function(){
    it('should respond to the "web-socket-close" event', function(){
      $rootScope.currentState = 'live';
      spyOn(WebSocket, 'close_socket');
      spyOn(WebSocket, 'init');
      $rootScope.$broadcast('web-socket-close');
      expect(WebSocket.close_socket).toHaveBeenCalled();
      expect(WebSocket.init).toHaveBeenCalled();
    });
  });

});
