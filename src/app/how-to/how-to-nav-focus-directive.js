(function() {
  angular.module('livefeed.how_to')

  .directive('navFocus', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        
        $("nav li").on("click", function(e){
          e.stopPropagation();
          e.preventDefault();
          $("nav li").removeClass("active");
          $(this).addClass("active");
          $(this).parents("li").addClass("active");
        });
        
        $(document).on("scroll", function() {
          makeActive();
        });

        makeActive();

        function makeActive(){
          var height;
          var window_height = document.body.offsetHeight;

          $("section").each(function(index, value){
            var scrollTop     = $(window).scrollTop(),
                elementOffset = $(value).offset().top,
                distance      = (elementOffset - scrollTop);
            if(distance < 1){
              var id = $(value).attr("id");
              $("nav li").removeClass("active");
              var newId = id + "-li";
              $("nav li#"+ newId).addClass("active");
              $("nav li#"+ newId).parents("li").addClass("active");
            }
          });
        }
      
      }
    };
  });

})();