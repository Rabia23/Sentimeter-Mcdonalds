(function() {
    angular.module('livefeed.live')

    .service('WebSocket', ['$rootScope','apiLinks', function($rootScope, apiLinks){
      var ws = null;
      return {

        init: function(){
          console.log("in the init function");
          ws = null;
          ws = new WebSocket(apiLinks.link.socket);
          ws.onopen = function (event) {
            console.log("sockets opened");
            $rootScope.$broadcast('web-socket-open');
          };
          ws.onmessage = function (event) {
            console.log("message received");
            $rootScope.$broadcast('web-socket-message', event.data);
          };
          ws.onerror = function(event){
            console.log("error in connection");
            $rootScope.$broadcast('web-socket-error');
          };
          ws.onclose = function(event){
            console.log("connection closing");
            $rootScope.$broadcast('web-socket-close');

          };
        },

        get_socket: function(){
          return ws;
        },

        close_socket: function(){
          return ws.close();
        }
      };

    }]);

})();