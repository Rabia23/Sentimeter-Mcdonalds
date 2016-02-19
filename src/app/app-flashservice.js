(function() {
  angular.module('livefeed')

  .factory('flashService', function($rootScope, $timeout, toaster){
    var flashId;
    return {
      createFlash: function(message, type){
        toaster.pop(type, message);
      }
    };
  });
})();