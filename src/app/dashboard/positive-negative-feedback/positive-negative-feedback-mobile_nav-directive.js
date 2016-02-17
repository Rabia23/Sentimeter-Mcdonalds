(function() {
    angular.module('livefeed.dashboard.positive_negative_feedback')

    .directive('mobileNav', function(){
      return {
        restrict: 'A',
          scope: {
          action: '&'
        },
        link: function(scope, ele, attrs){
          window.initMobileNav();
          window.initPositionFixed();
          ele.bind("click", function(event){
            scope.$apply(scope.action());
            assignHeight();
          });

          $(document).on("scroll", function() {
            assignHeight();
          });

           $(window).on("resize", function() {
            assignHeight();
          });

          function assignHeight(){
            var height;
            var window_height = document.body.offsetHeight;
            var content_top = $(".wrapper-content").offset().top;
            var header_height = $(".heading-holder").height();
            var button_holder = $(".btn-holder").height();
            if($(window).scrollTop() === 0){
              height = window_height - content_top - header_height - button_holder;
            }
            else if($(window).scrollTop() > 0 && $(window).scrollTop() <= content_top){
              height = window_height - content_top - header_height - button_holder + $(window).scrollTop();
            }
            else if($(window).scrollTop() > content_top){
              height = window_height - header_height - button_holder;
            }
            $(".comments-holder").css("height", height);
            window.initCustomForms();
          }
        }
      };
    });
})();