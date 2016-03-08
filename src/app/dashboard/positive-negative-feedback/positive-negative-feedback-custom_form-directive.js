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
              window.initCustomForms();
              $(window).on("resize", function() {
                modalHeight();
              });
            }

            function modalHeight(){
              var elemHolder = $('.modal-1200 .modal-content').height();
              var header = $('.modal-1200 .header-holder').height();
              var height = elemHolder - header;
              var content = $('.modal-1200 .modal-detail');
              var tableHolder = $('.modal-1200 .table-block').height();
              var tableHeader = $('.modal-1200 .table-header').height();
              var tableHeight = tableHolder - tableHeader;
              var tableContent = $('.modal-1200 .content');

              content.css({
              'height' : height
              });

              tableContent.css({
              'height' : tableHeight
              });
            }
          });

        }
      };
    });

})();