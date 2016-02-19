(function() {
  angular.module('livefeed')

  .factory('flashService', function(Flash, $rootScope, $timeout){
    var flashId;
    return {
      createFlash: function(message, type){
        $timeout(function(){
          if(flashId !== undefined){
            Flash.dismiss(flashId);
          }
          flashId = Flash.create(type, message, 5000, {class: 'custom-class'}, true);
        });
      },
      dismissFlash: function(){
        console.log("in the dissmiss flash");
        $timeout(function(){
          if(flashId){
            console.log("in the if");
            console.log(flashId);
            Flash.dismiss(flashId);
            flashId = undefined;
          }
        });
      }
    };
  });
})();