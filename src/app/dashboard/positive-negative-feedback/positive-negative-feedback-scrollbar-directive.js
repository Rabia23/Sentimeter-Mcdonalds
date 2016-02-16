(function() {
    angular.module('livefeed.dashboard.positive_negative_feedback')

    .directive('whenScrolled', function() {
      return {
        link: function(scope, elm, attr) {
          var raw = elm[0];
          elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
              if(scope.lock === false){
                scope.$apply(attr.whenScrolled);
              }
            }
          });
        }
      };
    });

})();