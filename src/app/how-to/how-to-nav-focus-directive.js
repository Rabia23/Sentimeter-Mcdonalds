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
            if(( $(window).scrollTop() >= $(value).offset().top ) && ( $(window).scrollTop() < ($(value).offset().top + $(value).height()))){
              var id = $(value).attr("id");
              $("nav li").removeClass("active");
              var newId = id + "-li";
              console.log(newId);
              console.log($("nav li#"+ newId));
              $("nav li#"+ newId).addClass("active");
              $("nav li#"+ newId).parents("li").removeClass("active");
              console.log($("nav li#"+ newId).parents("li").addClass("active"));
            }
          });
        }
      
      }
    };
  });

})();