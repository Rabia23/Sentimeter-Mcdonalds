(function() {
    angular.module('livefeed.dashboard.positive_negative_feedback')

    .directive('customForm', function(){
      return {
        restrict: 'A',
        scope: {
          comments: '='
        },
        link: function(scope, ele, attrs){
          scope.$watch('comments', function(watchedComments) {
            if(watchedComments !== undefined){
              modalHeight();
              setTimeout(function(){window.initCustomForms();},0.1);
              $(window).on("resize", function() {
                modalHeight();
              });
            }

            function modalHeight(){
              var elemHolder = $('.modal-1200 .modal-content').height();
              var header = $('.modal-1200 .header-holder').height();
              var height = elemHolder - header;
              var content = $('.modal-1200 .modal-detail');
              content.css({'height' : height});
            }
          });
        }
      };
    });

})();