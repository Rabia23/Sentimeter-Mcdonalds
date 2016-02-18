(function() {
  angular.module('livefeed.how_to')

  .directive('docNav', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        window.initMobileNav();
        
        $(document).on("scroll", function() {
          assignClass();
        });

        assignClass();

        function assignClass(){
          var height;
          var window_height = document.body.offsetHeight;
          var content_top = $(".wrapper-content").offset().top;
          if($(window).scrollTop() === 0){
            $("nav").removeClass("position-fixed");
          }
          else if($(window).scrollTop() > 0 && $(window).scrollTop() <= content_top){
            $("nav").removeClass("position-fixed");
          }
          else if($(window).scrollTop() > content_top){
            $("nav").addClass("position-fixed");
          }
        }
      
      }
    };
  });

})();