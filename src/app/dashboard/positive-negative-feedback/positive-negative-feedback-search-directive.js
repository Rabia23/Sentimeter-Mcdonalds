(function() {
  angular.module('livefeed.dashboard.positive_negative_feedback')

  .directive('searchField', function(){
    return {
      restrict: 'A',
      link: function(scope, ele, attrs){
        $(ele).on("keyup", function(event){
          if(event.which === 13){
            scope.showComments(scope.statusOption, scope.selectedBranch, scope.text);
          }
        });
      }
    };
  });

})();